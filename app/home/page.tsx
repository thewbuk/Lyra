'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser, useSession } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import * as Craft from '@/components/ui/craft';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Room {
  id: number;
  room_name: string;
  created_at: string;
  is_public: boolean;
  category: string;
  is_favorite?: boolean;
}

export default function RandomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();
  const { session } = useSession();

  const toggleFavorite = async (roomId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;

    try {
      const clerkToken = await session?.getToken({ template: 'supabase' });
      if (!clerkToken) {
        console.error('No token available');
        return;
      }

      console.log('Toggling favorite for room:', roomId, 'user:', user.id);

      // First try to insert directly
      const { data: insertData, error: insertError } = await supabase(
        clerkToken
      )
        .from('favorite_rooms')
        .insert([
          {
            room_id: roomId,
            user_id: user.id,
          },
        ])
        .select();

      if (insertError?.code === '23505') {
        // Unique violation = already exists
        console.log('Room was already favorited, removing...');
        const { error: deleteError } = await supabase(clerkToken)
          .from('favorite_rooms')
          .delete()
          .eq('room_id', roomId)
          .eq('user_id', user.id);

        if (deleteError) {
          console.error('Error removing favorite:', deleteError);
          return;
        }

        setRooms(
          rooms.map((room) =>
            room.id === roomId ? { ...room, is_favorite: false } : room
          )
        );
      } else if (insertError) {
        console.error('Error adding favorite:', insertError);
        return;
      } else {
        console.log('Room favorited successfully');
        setRooms(
          rooms.map((room) =>
            room.id === roomId ? { ...room, is_favorite: true } : room
          )
        );
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [session, selectedCategory, searchQuery]);

  const fetchRooms = async () => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    try {
      const clerkToken = await session.getToken({ template: 'supabase' });
      if (!clerkToken) {
        console.error('No token available');
        return;
      }

      // Fetch categories first
      const { data: categoriesData } = await supabase(clerkToken)
        .from('categories')
        .select('name')
        .order('name');

      setCategories((categoriesData || []).map((c) => c.name));

      let query = supabase(clerkToken)
        .from('rooms')
        .select('*')
        .eq('is_public', true)
        .or('isCategory.is.null,isCategory.eq.false')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data: roomsData, error: roomsError } = await query;

      if (roomsError) {
        console.error('Error fetching rooms:', roomsError);
        return;
      }

      // Fetch favorite rooms for the current user
      const { data: favoriteRooms, error: favoritesError } = await supabase(
        clerkToken
      )
        .from('favorite_rooms')
        .select('room_id')
        .eq('user_id', user?.id || '');

      if (favoritesError) {
        console.error('Error fetching favorites:', favoritesError);
        return;
      }

      const favoriteRoomIds = new Set(
        favoriteRooms?.map((fr) => fr.room_id) || []
      );

      setRooms(
        (roomsData || []).map((room) => ({
          ...room,
          is_favorite: favoriteRoomIds.has(room.id),
        }))
      );
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesCategory =
      selectedCategory === 'all' || room.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      room.room_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favoriteRooms = filteredRooms.filter((room) => room.is_favorite);
  const otherRooms = filteredRooms.filter((room) => !room.is_favorite);

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

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rooms List */}
          <Craft.Section>
            <Craft.Container>
              <div className="flex flex-col gap-6">
                {/* Favorite Rooms Section */}
                {user && favoriteRooms.length > 0 && (
                  <>
                    <h2 className="text-2xl font-semibold">Favorite Rooms</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      {favoriteRooms.map((room) => (
                        <div
                          key={room.id}
                          className="group relative flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                        >
                          <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xl text-primary">
                                {room.room_name || 'Unnamed Room'}{' '}
                              </h4>
                              {user && (
                                <div
                                  className="relative z-10"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-100"
                                    onClick={(e) => toggleFavorite(room.id, e)}
                                  >
                                    <Star
                                      className="fill-yellow-400 stroke-yellow-400"
                                      size={20}
                                    />
                                  </Button>
                                </div>
                              )}
                            </div>
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
                          <Link
                            href={`/room/${room.id}`}
                            className="absolute inset-0 z-0"
                            onClick={(e) => {
                              const target = e.target as HTMLElement;
                              if (
                                target.closest('button') ||
                                target.closest('[data-prevent-navigation]')
                              ) {
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                              }
                            }}
                          >
                            <span className="sr-only">View room</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                  </>
                )}

                {/* All/Filtered Rooms Section */}
                <h2 className="text-2xl font-semibold">
                  {selectedCategory === 'all' ? 'All Rooms' : selectedCategory}
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {isLoading ? (
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
                    otherRooms.map((room) => (
                      <div
                        key={room.id}
                        className="group relative flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                      >
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl text-primary">
                              {room.room_name || 'Unnamed Room'}{' '}
                            </h4>
                            {user && (
                              <div
                                className="relative z-10"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => toggleFavorite(room.id, e)}
                                >
                                  <Star
                                    className={
                                      room.is_favorite
                                        ? 'fill-yellow-400 stroke-yellow-400'
                                        : ''
                                    }
                                    size={20}
                                  />
                                </Button>
                              </div>
                            )}
                          </div>
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
                        <Link
                          href={`/room/${room.id}`}
                          className="absolute inset-0 z-0"
                          onClick={(e) => {
                            const target = e.target as HTMLElement;
                            if (
                              target.closest('button') ||
                              target.closest('[data-prevent-navigation]')
                            ) {
                              e.preventDefault();
                              e.stopPropagation();
                              return false;
                            }
                          }}
                        >
                          <span className="sr-only">View room</span>
                        </Link>
                      </div>
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
