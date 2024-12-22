'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import VideoList from './components/VideoList';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
import { RealtimeChannel, RealtimePresenceState } from '@supabase/supabase-js';

type Category = {
  id: number;
  name: string;
  description: string;
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

type PresenceState = {
  presence_ref: string;
  user_id: string;
  user_name: string;
  user_image: string;
  online_at: string;
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { user } = useUser();
  const [category, setCategory] = React.useState<Category | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [room, setRoom] = React.useState<Room | null>(null);
  const [usersInRoom, setUsersInRoom] = React.useState<RoomUser[]>([]);
  const channelRef = React.useRef<RealtimeChannel | null>(null);

  React.useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;

      try {
        // Convert URL format to proper case
        // e.g., "education" -> "Education"
        const searchName = decodeURIComponent(categoryId as string)
          .split('-')
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(' ');

        const { data, error } = await supabase()
          .from('categories')
          .select('*')
          .ilike('name', searchName)
          .single();

        if (error) throw error;
        setCategory(data);
      } catch (err) {
        console.error('Error fetching category:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  React.useEffect(() => {
    if (!category?.name || !user) return;

    let isSubscribed = true;
    const supabaseClient = supabase();

    const setupRoom = async () => {
      try {
        // First, try to find an existing room for this category
        let { data: existingRoom } = await supabaseClient
          .from('rooms')
          .select('*')
          .eq('category', category.name)
          .eq('is_public', true)
          .single();

        if (!existingRoom) {
          // If no room exists, create one
          const { data: newRoom, error: createError } = await supabaseClient
            .from('rooms')
            .insert({
              room_name: `${category.name} Room`,
              category: category.name,
              is_public: true,
              video_url: null,
              leaderTime: 0,
              isPlaying: false,
            })
            .select()
            .single();

          if (createError) throw createError;
          existingRoom = newRoom;
        }

        setRoom(existingRoom);

        // Set up realtime channel
        const channel = supabaseClient.channel(`room:${existingRoom.id}`, {
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
          })
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'rooms',
              filter: `id=eq.${existingRoom.id}`,
            },
            (payload) => {
              setRoom(payload.new as Room);
            }
          );

        channelRef.current = channel;

        await channel.subscribe(async (status) => {
          if (status === 'SUBSCRIBED' && isSubscribed) {
            await channel.track({
              user_id: user.id,
              user_name: user.fullName || user.username || 'Anonymous',
              user_image: user.imageUrl,
              online_at: new Date().toISOString(),
            });
          }
        });
      } catch (err) {
        console.error('Error setting up room:', err);
      }
    };

    setupRoom();

    return () => {
      isSubscribed = false;
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [category?.name, user]);

  if (isLoading) {
    return <Skeleton className="h-screen w-full" />;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-4xl font-bold mb-6">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>
      {room && (
        <VideoList
          categoryName={category.name}
          room={room}
          users={usersInRoom}
        />
      )}
    </div>
  );
};

export default CategoryPage;
