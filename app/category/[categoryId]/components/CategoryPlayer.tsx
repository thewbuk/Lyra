import * as React from 'react';
import ReactPlayer from 'react-player/youtube';
import { Skeleton } from '@/components/ui/skeleton';
import { useSocket } from '@/lib/hooks/use-socket';

type CategoryPlayerProps = {
  url: string;
  isLoading: boolean;
  error: string | null;
  onVideoEnd?: () => void;
};

const SYNC_INTERVAL = 2000;
const TIME_SYNC_THRESHOLD = 1;

// YouTube player states
const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_BUFFERING = 3;

const CategoryPlayer = ({
  url,
  isLoading,
  error,
  onVideoEnd,
}: CategoryPlayerProps) => {
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
    } catch (err) {
      console.error('Error syncing video state:', err);
    }
  }, [ready, videoState]);

  // Effect to periodically send current time to server
  React.useEffect(() => {
    if (!ready || !playerRef.current || !isConnected) return;

    const syncInterval = setInterval(() => {
      const player = playerRef.current?.getInternalPlayer();
      if (!player) return;

      try {
        const currentTime = playerRef.current.getCurrentTime();
        const isPlaying = player.getPlayerState() === YT_PLAYING;

        sendMessage({
          type: 'videoState',
          data: {
            leaderTime: currentTime,
            isPlaying,
            videoUrl: url,
            serverTimestamp: Date.now(),
          },
        });
      } catch (err) {
        console.error('Error sending video state:', err);
      }
    }, SYNC_INTERVAL);

    return () => clearInterval(syncInterval);
  }, [ready, isConnected, url, sendMessage]);

  // Effect to handle URL changes
  React.useEffect(() => {
    if (!playerRef.current) return;

    const player = playerRef.current?.getInternalPlayer();
    if (!player) return;

    // Force play when URL changes
    player.playVideo();
  }, [url]);

  const handleReady = React.useCallback(() => {
    setReady(true);
    if (!hasInitialized.current) {
      const player = playerRef.current?.getInternalPlayer();
      if (player) {
        playerRef.current.seekTo(videoState.leaderTime, 'seconds');
        player.playVideo();
        hasInitialized.current = true;
      }
    }
  }, [videoState.leaderTime]);

  const handleEnded = React.useCallback(() => {
    if (onVideoEnd) {
      onVideoEnd();
    }
  }, [onVideoEnd]);

  const handlePlay = () => {
    if (!ready || !playerRef.current || !hasInitialized.current) return;

    if (!videoState.isPlaying) {
      sendMessage({
        type: 'videoState',
        data: {
          leaderTime: playerRef.current.getCurrentTime(),
          isPlaying: true,
          videoUrl: url,
          serverTimestamp: Date.now(),
        },
      });
    }
  };

  const handlePause = () => {
    if (!ready || !playerRef.current || !hasInitialized.current) return;

    if (videoState.isPlaying) {
      sendMessage({
        type: 'videoState',
        data: {
          leaderTime: playerRef.current.getCurrentTime(),
          isPlaying: false,
          videoUrl: url,
          serverTimestamp: Date.now(),
        },
      });
    }
  };

  const handleSeek = () => {
    if (!ready || !playerRef.current || !hasInitialized.current) return;

    isSeeking.current = true;
    const currentTime = playerRef.current.getCurrentTime();

    sendMessage({
      type: 'videoState',
      data: {
        leaderTime: currentTime,
        isPlaying: videoState.isPlaying,
        videoUrl: url,
        serverTimestamp: Date.now(),
      },
    });

    setTimeout(() => {
      isSeeking.current = false;
    }, 500);
  };

  if (isLoading) {
    return <Skeleton className="h-[500px] w-full rounded-md" />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="aspect-video w-full">
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${url}`}
        width="100%"
        height="100%"
        playing={true}
        controls={true}
        onReady={handleReady}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        onEnded={handleEnded}
        config={{
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            controls: 1,
          },
        }}
      />
    </div>
  );
};

export default CategoryPlayer;
