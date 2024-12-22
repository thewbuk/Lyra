'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InviteUser from './InviteUser';

type RoomHeaderProps = {
  roomId: string;
  roomName: string;
  category: string;
  onNavigate: (direction: 'next' | 'prev') => Promise<void>;
};

const RoomHeader = ({
  roomId,
  roomName,
  category,
  onNavigate,
}: RoomHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-foreground">
        {roomName || 'Loading...'}
      </h1>
      <div className="flex items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          <strong>Room ID:</strong> {roomId}
        </p>
        <InviteUser chatId={roomId} />
        {category && (
          <Badge variant="secondary" className="text-sm">
            {category}
          </Badge>
        )}
      </div>
      {category && (
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('prev')}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Room
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('next')}
          >
            Next Room
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomHeader;
