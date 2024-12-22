'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser, useSession } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import * as Craft from '@/components/ui/craft';
import { Skeleton } from '@/components/ui/skeleton';

interface Room {
  id: string;
  room_name: string;
  created_at: string;
  is_public: boolean;
  category: string;
}

export default function RandomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { session } = useSession();

  useEffect(() => {
    fetchRooms();
  }, [session]);

  const fetchRooms = async () => {
    setIsLoading(true);
    let clerkToken: string | undefined;
    try {
      clerkToken = (await session?.getToken()) || undefined;
    } catch (error) {
      console.error('Error getting token:', error);
    }

    const { data, error } = await supabase(clerkToken)
      .from('rooms')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching rooms:', error);
      return;
    }

    setRooms(data as Room[]);
    setIsLoading(false);
  };

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Introduction Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Public Video Rooms
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Join existing public rooms or create your own to watch videos
              together.
            </p>
          </div>

          {/* Create Room Button */}
          <div className="flex justify-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Create New Room
            </Link>
          </div>

          {/* Rooms List */}
          <Craft.Section>
            <Craft.Container>
              <div className="flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {isLoading ? (
                    // Skeleton loading state
                    <>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="rounded-lg border p-6">
                          <div className="space-y-4">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    rooms.map((room) => (
                      <Link
                        href={`/room/${room.id}`}
                        key={room.id}
                        className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                      >
                        <div className="grid gap-4">
                          <h4 className="text-xl text-primary">
                            {room.room_name || 'Unnamed Room'}{' '}
                          </h4>
                          <div className="space-y-2">
                            <p className="text-base opacity-75">
                              Category: {room.category}
                            </p>
                            <p className="text-base opacity-75">
                              Created:{' '}
                              {new Date(room.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </Craft.Container>
          </Craft.Section>
        </div>
      </div>
    </div>
  );
}
