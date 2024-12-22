'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import { RealtimeChannel, RealtimePresenceState } from '@supabase/supabase-js';
import VideoPlayer from '../components/VideoPlayer';
import VideoForm from '../components/VideoForm';
import RoomHeader from '../components/RoomHeader';
import UsersList from '../components/UsersList';
import Chat from '../components/Chat';

type RoomUser = {
  id: string;
  name: string;
  image: string;
};

type PresenceState = {
  presence_ref: string;
  user_id: string;
  user_name: string;
  user_image: string;
  online_at: string;
};

const RoomPage = () => {
  const { roomId } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [videoUrl, setVideoUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [usersInRoom, setUsersInRoom] = React.useState<RoomUser[]>([]);
  const [category, setCategory] = React.useState<string>('');
  const [roomName, setRoomName] = React.useState<string>('');
  const channelRef = React.useRef<RealtimeChannel | null>(null);

  React.useEffect(() => {
    if (!roomId || !user) return;

    let isSubscribed = true;
    const supabaseClient = supabase();

    const setupRoom = async () => {
      try {
        const channel = supabaseClient.channel(`room:${roomId}`, {
          config: {
            presence: {
              key: user.id,
            },
          },
        });

        const updateUsers = (
          presenceState: RealtimePresenceState<PresenceState>
        ) => {
          if (!isSubscribed) return;

          const uniqueUsers = new Map<string, RoomUser>();
          Object.values(presenceState)
            .flat()
            .forEach((presence: PresenceState) => {
              uniqueUsers.set(presence.user_id, {
                id: presence.user_id,
                name: presence.user_name,
                image: presence.user_image,
              });
            });

          setUsersInRoom(Array.from(uniqueUsers.values()));
        };

        channel
          .on('presence', { event: 'sync' }, () => {
            updateUsers(channel.presenceState<PresenceState>());
          })
          .on('presence', { event: 'join' }, () => {
            updateUsers(channel.presenceState<PresenceState>());
          })
          .on('presence', { event: 'leave' }, () => {
            updateUsers(channel.presenceState<PresenceState>());
          });

        await channel.subscribe(
          async (
            status: 'SUBSCRIBED' | 'TIMED_OUT' | 'CLOSED' | 'CHANNEL_ERROR'
          ) => {
            if (status === 'SUBSCRIBED' && isSubscribed) {
              await channel.track({
                user_id: user.id,
                user_name: user.fullName || user.id,
                user_image: user.imageUrl || 'https://github.com/shadcn.png',
                online_at: new Date().toISOString(),
              });

              // Get initial room data
              const { data, error: roomError } = await supabaseClient
                .from('rooms')
                .select('video_url, category, room_name')
                .eq('id', roomId)
                .single();

              if (roomError) {
                if (isSubscribed) {
                  setError('Failed to load room data.');
                  setIsLoading(false);
                }
              } else if (isSubscribed && data) {
                setVideoUrl(data.video_url);
                setCategory(data.category || '');
                setRoomName(data.room_name || '');
                setIsLoading(false);
              }
            }
          }
        );

        channelRef.current = channel;
      } catch (error) {
        console.error('Error in setupRoom:', error);
        if (isSubscribed) {
          setError('Failed to setup room.');
          setIsLoading(false);
        }
      }
    };

    setupRoom();

    return () => {
      isSubscribed = false;
      if (channelRef.current) {
        channelRef.current.untrack();
        channelRef.current.unsubscribe();
        supabaseClient.removeChannel(channelRef.current);
      }
    };
  }, [roomId, user]);

  const navigateToRoom = async (direction: 'next' | 'prev') => {
    if (!category) return;

    try {
      console.log('Navigating:', direction);
      const { data: rooms } = await supabase()
        .from('rooms')
        .select('id')
        .eq('category', category)
        .eq('is_public', true)
        .order('created_at', { ascending: true });

      if (!rooms || rooms.length === 0) {
        console.log('No rooms found');
        return;
      }

      const currentIndex = rooms.findIndex((room) => room.id === roomId);
      if (currentIndex === -1) {
        const nextRoomId =
          direction === 'next' ? rooms[0].id : rooms[rooms.length - 1].id;
        await router.replace(`/room/${nextRoomId}`);
        router.refresh();
        return;
      }

      const nextIndex =
        direction === 'next'
          ? (currentIndex + 1) % rooms.length
          : (currentIndex - 1 + rooms.length) % rooms.length;

      const nextRoomId = rooms[nextIndex].id;
      await router.replace(`/room/${nextRoomId}`);
      router.refresh();
    } catch (error) {
      console.error('Error navigating rooms:', error);
    }
  };

  const onSubmit = async (data: { url: string }) => {
    if (!roomId) return;

    try {
      const { error: updateError } = await supabase()
        .from('rooms')
        .update({ video_url: data.url })
        .eq('id', roomId);

      if (updateError) {
        throw updateError;
      }

      setVideoUrl(data.url);
    } catch (error) {
      console.error('Error updating video URL:', error);
      setError('Failed to update video URL.');
    }
  };

  const handleRefreshUsers = async () => {
    if (!roomId) return;

    setIsLoading(true);
    try {
      const { data: presenceData } = await supabase()
        .from('presence')
        .select('*')
        .eq('room_id', roomId);

      if (presenceData) {
        const users: RoomUser[] = presenceData.map(
          (presence: PresenceState) => ({
            id: presence.user_id,
            name: presence.user_name,
            image: presence.user_image,
          })
        );
        setUsersInRoom(users);
      }
    } catch (error) {
      console.error('Error refreshing users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen" key={roomId as string}>
      <div className="mx-auto max-w-4xl p-4">
        <RoomHeader
          roomId={roomId as string}
          roomName={roomName}
          category={category}
          onNavigate={navigateToRoom}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card p-6">
              <div className="relative aspect-video w-full">
                <VideoPlayer
                  url={videoUrl}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </div>

            <div className="mt-4">
              <VideoForm onSubmit={onSubmit} isLoading={isLoading} />
            </div>
          </div>

          <div className="space-y-4">
            <Chat roomId={roomId as string} />
            <UsersList
              users={usersInRoom}
              isLoading={isLoading}
              onRefresh={handleRefreshUsers}
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Supported Platform
          </h2>
          <div className="flex justify-center gap-4">
            <span className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
              YouTube
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
