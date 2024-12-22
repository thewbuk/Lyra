// components/containers/watch/details.tsx

'use client';

import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image as LucideImage, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import WatchContainer from './watch';

interface RoomDetails {
  title: string;
  description: string;
  createdAt: string;
  creator: string;
  thumbnail: string;
  // Add more fields as necessary
}

interface DetailsContainerProps {
  data: RoomDetails;
  roomId: string;
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({
  data,
  roomId,
}) => {
  return (
    <div className="">
      <div className={cn('mx-auto max-w-6xl md:pt-4')}>
        <div className="h-[30dvh] w-full overflow-hidden border bg-muted shadow md:rounded-lg lg:h-[55dvh]">
          <div
            style={{
              backgroundImage: `url('${data.thumbnail}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="h-full w-full brightness-50"
            data-testid="banner"
          />
        </div>

        <div className="mx-auto my-8 max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0">
          <main className="flex flex-col gap-4 md:flex-row">
            <aside className="-mt-24 w-full space-y-2 md:-mt-32 md:w-1/3">
              <div
                className={cn(
                  'relative flex aspect-poster w-full items-center justify-center overflow-hidden rounded-lg border bg-muted text-muted shadow'
                )}
              >
                {data.thumbnail ? (
                  <Image
                    fill
                    className="object-fill"
                    loading="lazy"
                    sizes="100%"
                    alt={data.title}
                    src={data.thumbnail}
                  />
                ) : (
                  <LucideImage size={24} />
                )}
              </div>
            </aside>

            <article className="flex w-full flex-col gap-2 md:w-2/3">
              <span className="text-xs text-muted-foreground">
                Created on {format(new Date(data.createdAt), 'PPP')}
              </span>

              <h1 className="text-lg font-bold md:text-4xl">{data.title}</h1>

              <div className="flex flex-wrap items-center gap-2">
                {data.description && (
                  <>
                    <p className="text-muted-foreground">{data.description}</p>
                    <Separator orientation="vertical" className="h-6" />
                  </>
                )}

                <Badge variant="default" className="whitespace-nowrap">
                  Creator: {data.creator}
                </Badge>
              </div>

              <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
                {/* Additional room details or description */}
              </p>
            </article>
          </main>

          <Tabs defaultValue="watch">
            <div className="scrollbar-hide">
              <TabsList>
                <TabsTrigger value="watch">Watch</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="watch" className="mt-4">
              <WatchContainer roomId={roomId} />
            </TabsContent>

            <TabsContent value="members" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {/* Mock members. Replace with actual data if available */}
                <Badge variant="secondary">User1</Badge>
                <Badge variant="secondary">User2</Badge>
                <Badge variant="secondary">User3</Badge>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <p className="text-muted-foreground">
                Settings will be available soon.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
