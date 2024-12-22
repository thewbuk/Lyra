'use client';

import * as React from 'react';
import { type Message } from 'ai';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { Loader2 } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
  onInputChange?: (text: string) => void;
};

const exampleMessages = [
  "What's my current financial situation?",
  'How can I start investing?',
  'Help me create a budget plan',
  'Explain cryptocurrency basics',
  'Tips for saving money',
];

const MessageList = ({
  messages,
  isLoading,
  onInputChange,
}: MessageListProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleExampleClick = (text: string) => {
    if (onInputChange) {
      onInputChange(text);
    }
  };

  return (
    <div className="flex-1 relative">
      <ScrollArea className="h-[calc(100vh-250px)] p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-center text-muted-foreground">
                Start a conversation or try these examples:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {exampleMessages.map((text, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-sm"
                    onClick={() => handleExampleClick(text)}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-2">
              <Avatar className="w-8 h-8">
                <div className="w-full h-full rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  AI
                </div>
              </Avatar>
              <div className="rounded-lg px-4 py-2 bg-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export { MessageList };
