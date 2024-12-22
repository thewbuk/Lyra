'use client';

import * as React from 'react';
import { type Message } from 'ai';
import { Avatar } from '@/components/ui/avatar';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  if (message.role === 'system') return null;

  const hasFile = message.content.includes("I've uploaded a PDF document");

  return (
    <div
      className={cn(
        'flex w-full items-start gap-2',
        message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      <Avatar className="w-8 h-8">
        <div
          className={cn(
            'w-full h-full rounded-full flex items-center justify-center text-xs font-medium',
            message.role === 'assistant'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {message.role === 'assistant' ? 'AI' : 'You'}
        </div>
      </Avatar>
      {hasFile && (
        <div className="flex items-center">
          <FileText className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%]',
          message.role === 'assistant'
            ? 'bg-muted text-foreground'
            : 'bg-primary text-primary-foreground'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
};

export { ChatMessage };
