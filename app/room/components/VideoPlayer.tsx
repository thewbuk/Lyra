'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useSocket } from '@/lib/hooks/use-socket';
import type { ReactPlayerProps } from 'react-player';

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
}

const VideoPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-md" />,
});

type VideoPlayerProps = {
  url: string;
  isLoading: boolean;
  error: string | null;
};

const SYNC_INTERVAL = 2000;
const TIME_SYNC_THRESHOLD = 1;

// YouTube player states
const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_BUFFERING = 3;

const VideoPlayerComponent = ({ url, isLoading, error }: VideoPlayerProps) => {
  const playerRef = React.useRef<any>(null);
  const [ready, setReady] = React.useState(false);
  const { videoState, sendMessage, isConnected } = useSocket();
  const isSeeking = React.useRef<boolean>(false);
  const hasInitialized = React.useRef<boolean>(false);

  // Effect to handle video state changes
  React.useEffect(() => {
    if (!ready || !playerRef.current) return;

    const player = playerRef.current?.getInternalPlayer();
    if (!player) return;

    try {
      const currentState = player.getPlayerState();
      const currentTime = playerRef.current.getCurrentTime();
      const timeDiff = Math.abs(currentTime - videoState.leaderTime);

      // Always sync time if difference is significant
      if (timeDiff > TIME_SYNC_THRESHOLD) {
        if (videoState.isPlaying) {
          playerRef.current.seekTo(videoState.leaderTime, 'seconds');
        }
      }

      // Handle play state
      if (
        videoState.isPlaying &&
        currentState !== YT_PLAYING &&
        currentState !== YT_BUFFERING
      ) {
        player.playVideo();
      } else if (!videoState.isPlaying && currentState === YT_PLAYING) {
        player.pauseVideo();
      }
    } catch (error) {
      // Error handling can be added here if needed
    }
  }, [ready, videoState]);

  // Effect to handle URL changes
  React.useEffect(() => {
    if (url !== videoState.videoUrl && url) {
      sendMessage({
        command: 'videoUpdate',
        videoUrl: url,
      });
    }
  }, [url, videoState.videoUrl, sendMessage]);

  const handleReady = React.useCallback(() => {
    setReady(true);

    const player = playerRef.current?.getInternalPlayer();
    if (!player) return;

    try {
      // Initial sync
      if (videoState.isPlaying) {
        playerRef.current.seekTo(videoState.leaderTime, 'seconds');
        player.playVideo();
      }

      hasInitialized.current = true;
    } catch (error) {
      // Error handling can be added here if needed
    }
  }, [videoState]);

  const handlePlay = () => {
    if (!ready || !playerRef.current || !hasInitialized.current) return;

    if (!videoState.isPlaying) {
      sendMessage({
        command: 'play',
        currentTime: playerRef.current.getCurrentTime(),
      });
    }
  };

  const handlePause = () => {
    if (!ready || !playerRef.current || !hasInitialized.current) return;

    if (videoState.isPlaying) {
      sendMessage({
        command: 'pause',
        currentTime: playerRef.current.getCurrentTime(),
      });
    }
  };

  const handleSeek = () => {
    if (!ready || !playerRef.current || !hasInitialized.current) return;

    isSeeking.current = true;
    const currentTime = playerRef.current.getCurrentTime();

    sendMessage({
      command: 'seek',
      currentTime,
      isPlaying: videoState.isPlaying,
    });

    setTimeout(() => {
      isSeeking.current = false;
    }, 500);
  };

  if (error) {
    return (
      <div className="absolute top-0 left-0 right-0 bg-destructive text-destructive-foreground p-2 text-center rounded-t-md">
        {error}
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-md">
        <p className="text-muted-foreground">
          Connecting to Supabase Realtime...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <VideoPlayer
        ref={playerRef}
        url={videoState.videoUrl || url}
        playing={videoState.isPlaying}
        controls={true}
        width="100%"
        height="100%"
        onReady={handleReady}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        config={{
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
          },
        }}
      />
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-destructive text-destructive-foreground p-2 text-center rounded-t-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default VideoPlayerComponent;
