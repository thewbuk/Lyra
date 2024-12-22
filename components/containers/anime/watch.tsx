// components/containers/watch/watch.tsx

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImageIcon, Play } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Video } from '@/lib/api';
import { useEffect, useState } from 'react';

interface WatchProps {
  roomId: string;
}

const WatchContainer: React.FC<WatchProps> = ({ roomId }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        // Fetch videos related to the room using mock data or new API
        // For now, using mock data
        const mockVideos: Video[] = [
          {
            videoId: 'dQw4w9WgXcQ',
            title: 'Sample Video 1',
            description: 'Description for Sample Video 1',
            channelHandle: 'samplechannel1',
            viewCount: 1000,
            publishedTimeText: '2 days ago',
            lengthText: '5:00',
            channelTitle: 'Sample Channel 1',
            thumbnail: [
              { url: '/images/videos/sample1.png', width: 480, height: 270 },
            ],
            category: 'Entertainment',
            thumbnailDefault: '/images/videos/sample1-default.png',
            thumbnailMedium: '/images/videos/sample1-medium.png',
            thumbnailHigh: '/images/videos/sample1-high.png',
            thumbnailStandard: '/images/videos/sample1-standard.png',
            thumbnailMaxres: '/images/videos/sample1-maxres.png',
            tags: ['tag1', 'tag2'],
            chapters: ['Chapter1', 'Chapter2'],
            isLive: false,
          },
          {
            videoId: 'eY52Zsg-KVI',
            title: 'Sample Video 2',
            description: 'Description for Sample Video 2',
            channelHandle: 'samplechannel2',
            viewCount: 2500,
            publishedTimeText: '5 days ago',
            lengthText: '7:30',
            channelTitle: 'Sample Channel 2',
            thumbnail: [
              { url: '/images/videos/sample2.png', width: 480, height: 270 },
            ],
            category: 'Music',
            thumbnailDefault: '/images/videos/sample2-default.png',
            thumbnailMedium: '/images/videos/sample2-medium.png',
            thumbnailHigh: '/images/videos/sample2-high.png',
            thumbnailStandard: '/images/videos/sample2-standard.png',
            thumbnailMaxres: '/images/videos/sample2-maxres.png',
            tags: ['tag3', 'tag4'],
            chapters: ['Chapter3', 'Chapter4'],
            isLive: false,
          },
          // Add more mock videos as needed
        ];
        setVideos(mockVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [roomId]);

  if (loading) {
    return <div className="text-center mt-10">Loading videos...</div>;
  }

  return (
    <ScrollArea className="h-[40rem] rounded-md border">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {videos.map((video) => (
          <Link
            key={video.videoId}
            href={`/room/${roomId}/watch/${video.videoId}`}
            className="relative flex flex-col rounded p-4"
          >
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl">
              {video.thumbnail[0]?.url ? (
                <Image
                  src={video.thumbnail[0].url}
                  alt={video.title || `Video ${video.videoId}`}
                  width={480}
                  height={270}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon />
              )}
              <div className="absolute inset-0 z-50 flex items-center justify-center">
                <Button variant={'ghost'} className="h-12 w-12">
                  <Play className="h-6 w-6 text-white" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold">{video.title}</h2>
              <p className="line-clamp-2 text-gray-700 dark:text-slate-300">
                {video.description || 'No description available.'}
              </p>
              <Badge variant="secondary" className="mt-2">
                {video.channelTitle}
              </Badge>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};

export default WatchContainer;
