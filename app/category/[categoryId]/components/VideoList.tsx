'use client';

import * as React from 'react';
import { supabase } from '@/lib/supabaseClient';
import Chat from '@/app/room/components/Chat';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CategoryPlayer from './CategoryPlayer';
import CategoryUsersList from './CategoryUsersList';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSocket } from '@/lib/hooks/use-socket';

type Video = {
  id: bigint;
  videoid: string;
  title: string;
  description: string;
  thumbnailurl: string;
  thumbnaildefault: string;
  thumbnailmedium: string;
  thumbnailhigh: string;
  thumbnailstandard: string;
  thumbnailmaxres: string;
  category: string;
  duration: string;
  channeltitle: string;
};

type Room = {
  id: number;
  video_url: string | null;
  room_name: string;
  category: string;
  is_public: boolean;
  leaderTime: number;
  isPlaying: boolean;
};

type RoomUser = {
  id: string;
  name: string;
  image: string;
};

type VideoListProps = {
  categoryName: string;
  room: Room;
  users: RoomUser[];
};

const VideoList = ({ categoryName, room, users }: VideoListProps) => {
  const { user } = useUser();
  const { sendMessage } = useSocket();
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = React.useState<Video | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    React.useState(false);

  // Initialize or get room for category
  React.useEffect(() => {
    const initializeRoom = async () => {
      if (!user?.id || !categoryName) return;

      try {
        // Get the room for this category
        const { data: room, error: roomError } = await supabase()
          .from('rooms')
          .select('id, video_url')
          .eq('category', categoryName)
          .single();

        if (roomError) {
          console.error('Error getting room:', roomError);
          setError('Failed to get room');
          return;
        }

        // If there's an active video in the room, find it in the videos list
        if (room.video_url) {
          const videoId = room.video_url.split('v=')[1];
          const { data: videoData } = await supabase()
            .from('videos')
            .select('*')
            .eq('videoid', videoId)
            .single();

          if (videoData) {
            setCurrentVideo(videoData);
          }
        }
      } catch (err) {
        console.error('Error initializing room:', err);
        setError('Failed to initialize room');
      }
    };

    initializeRoom();
  }, [categoryName, user?.id]);

  React.useEffect(() => {
    const fetchVideos = async () => {
      if (!categoryName) return;

      try {
        const { data, error } = await supabase()
          .from('videos')
          .select('*')
          .eq('category', categoryName)
          .order('publishedat', { ascending: false });

        if (error) throw error;

        // Filter out videos with invalid or missing thumbnails
        const validVideos = (data || []).filter(
          (video) =>
            video.thumbnailstandard ||
            video.thumbnailhigh ||
            video.thumbnailmedium ||
            video.thumbnaildefault
        );

        setVideos(validVideos);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [categoryName]);

  const handleVideoSelect = async (video: Video) => {
    try {
      // Set current video first
      setCurrentVideo(video);

      // Update room immediately
      await supabase()
        .from('rooms')
        .update({
          video_url: `https://www.youtube.com/watch?v=${video.videoid}`,
          leaderTime: 0,
          isPlaying: true,
        })
        .eq('id', room.id);

      // Send socket message after room update
      sendMessage({
        type: 'videoState',
        data: {
          leaderTime: 0,
          isPlaying: true,
          videoUrl: `https://www.youtube.com/watch?v=${video.videoid}`,
          serverTimestamp: Date.now(),
        },
      });
    } catch (err) {
      console.error('Error updating room video:', err);
    }
  };

  const handleVideoEnd = React.useCallback(() => {
    const currentIndex = videos.findIndex((v) => v.id === currentVideo?.id);
    if (currentIndex > -1 && currentIndex < videos.length - 1) {
      handleVideoSelect(videos[currentIndex + 1]);
    }
  }, [videos, currentVideo]);

  const videoUrl = currentVideo
    ? `https://www.youtube.com/watch?v=${currentVideo.videoid}`
    : '';

  // Helper function to get the best available thumbnail
  const getBestThumbnail = (video: Video) => {
    return (
      video.thumbnailstandard ||
      video.thumbnailhigh ||
      video.thumbnailmedium ||
      video.thumbnaildefault ||
      'https://placehold.co/320x180?text=No+Thumbnail'
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2">
                <Skeleton className="h-20 w-32" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      <div className="lg:col-span-2 space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
          {currentVideo && (
            <CategoryPlayer
              url={currentVideo.videoid}
              isLoading={false}
              error={null}
              onVideoEnd={handleVideoEnd}
            />
          )}
        </div>
        <div className="space-y-2">
          {currentVideo && (
            <>
              <h2 className="text-xl font-bold">{currentVideo.title}</h2>
              <p
                className={cn(
                  'text-gray-600 whitespace-pre-wrap',
                  !isDescriptionExpanded && 'line-clamp-3'
                )}
              >
                {currentVideo.description}
              </p>
              {currentVideo.description &&
                currentVideo.description.length > 0 && (
                  <Button
                    variant="ghost"
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                  >
                    {isDescriptionExpanded ? 'Show less' : 'Show more'}
                  </Button>
                )}
            </>
          )}
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex p-4 gap-2">
              <CategoryUsersList categoryName={categoryName} users={users} />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div className="lg:col-span-1 space-y-4">
        <Chat roomId={room.id.toString()} />
        <div className="space-y-2">
          <h3 className="font-semibold">Up Next</h3>
          <ScrollArea className="h-[calc(100vh-16rem)] rounded-md border">
            <div className="space-y-2 p-4">
              {videos.map((video) => (
                <button
                  key={video.videoid}
                  onClick={() => handleVideoSelect(video)}
                  className={`w-full text-left p-2 rounded hover:bg-accent ${
                    video === currentVideo ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex gap-2">
                    <img
                      src={getBestThumbnail(video)}
                      alt={video.title}
                      className="w-32 h-18 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://placehold.co/320x180?text=No+Thumbnail';
                      }}
                    />
                    <div>
                      <p className="font-medium line-clamp-2">{video.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {video.channeltitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
