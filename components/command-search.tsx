'use client';

import { ReactNode, useEffect, useState } from 'react';
import { CommandIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  getRecentSearchesFromLocalStorage,
  saveSearchToLocalStorage,
} from '@/components/storage';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@clerk/nextjs';
import { DialogTitle, DialogContent } from '@/components/ui/dialog';

type CategoryResult = {
  id: number;
  name: string;
  description: string;
};

type RoomResult = {
  id: string;
  room_name: string;
  created_at: string;
  category: string;
};

type Result = {
  categories: Array<CategoryResult>;
  rooms: Array<RoomResult>;
};

const CommandSearchSkeleton = () => (
  <div className="flex items-center justify-between gap-4 rounded-sm p-2">
    <Skeleton className="h-[2ex] w-[20ch]" />
    <Skeleton className="h-[2ex] w-[4ch]" />
  </div>
);

type CommandSearchGroupProps = {
  heading: string;
  children: ReactNode;
};

const CommandSearchGroup = ({ children, heading }: CommandSearchGroupProps) => {
  return (
    <div className="space-y-2 p-4">
      <h4 className="text-sm font-bold">{heading}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};

export const CommandSearch = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [result, setResults] = useState<Result>({
    categories: [],
    rooms: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { session } = useSession();

  const pathName = usePathname();

  useEffect(() => {
    const searches = getRecentSearchesFromLocalStorage();
    setRecentSearches(searches);
  }, []);

  const fetchResults = async (searchTerm: string) => {
    setIsLoading(true);
    if (searchTerm) {
      saveSearchToLocalStorage(searchTerm);

      // Fetch categories without token
      const categoriesPromise = supabase()
        .from('categories')
        .select('*')
        .ilike('name', `%${searchTerm}%`)
        .order('name');

      let clerkToken: string | undefined;
      try {
        const token = await session?.getToken();
        if (token) {
          clerkToken = token;
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }

      const roomsPromise = supabase(clerkToken)
        .from('rooms')
        .select('*')
        .ilike('room_name', `%${searchTerm}%`)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      const [categoriesData, roomsData] = await Promise.all([
        categoriesPromise,
        roomsPromise,
      ]);

      setResults({
        categories: categoriesData.data || [],
        rooms: roomsData.data || [],
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchResults(search);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (open) setOpen(false);
  }, [pathName]);

  const hasCategories = result.categories.length > 0;
  const hasRooms = result.rooms.length > 0;

  return (
    <>
      <Button
        variant="outline"
        className="flex w-full flex-1 justify-between gap-2 pr-2 text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        Search Categories & Rooms
        <div className="mobile:hidden flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
          <CommandIcon size={12} />K
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Search</DialogTitle>
          <Command>
            <CommandInput
              placeholder="Search categories and rooms..."
              onValueChange={setSearch}
              value={search}
            />

            <CommandList>
              {recentSearches.length > 0 && (
                <CommandSearchGroup heading="Recent Searches">
                  {recentSearches.map((item, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
                      onClick={() => setSearch(item)}
                    >
                      <span className="truncate whitespace-nowrap text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </CommandSearchGroup>
              )}

              {isLoading ? (
                <div className="space-y-8">
                  <CommandSearchGroup heading="Categories">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <CommandSearchSkeleton key={index} />
                    ))}
                  </CommandSearchGroup>

                  <CommandSearchGroup heading="Rooms">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <CommandSearchSkeleton key={index} />
                    ))}
                  </CommandSearchGroup>
                </div>
              ) : (
                <div>
                  {hasCategories && (
                    <CommandSearchGroup heading="Categories">
                      {result.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.name.toLowerCase()}`}
                          className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
                        >
                          <span className="truncate whitespace-nowrap text-sm">
                            {category.name}
                          </span>
                          <span className="whitespace-nowrap text-xs text-muted-foreground">
                            {category.description}
                          </span>
                        </Link>
                      ))}
                    </CommandSearchGroup>
                  )}

                  {hasRooms && (
                    <CommandSearchGroup heading="Rooms">
                      {result.rooms.map((room) => (
                        <Link
                          key={room.id}
                          href={`/room/${room.id}`}
                          className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
                        >
                          <span className="truncate whitespace-nowrap text-sm">
                            {room.room_name}
                          </span>
                          <span className="whitespace-nowrap text-xs text-muted-foreground">
                            {room.category}
                          </span>
                        </Link>
                      ))}
                    </CommandSearchGroup>
                  )}

                  {!hasCategories && !hasRooms && !isLoading && (
                    <p className="p-8 text-center">No Results</p>
                  )}
                </div>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </CommandDialog>
    </>
  );
};
