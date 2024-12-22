'use client';

import * as React from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Send } from 'lucide-react';

type Message = {
  id: string;
  room_id: number;
  user_id: string | null;
  user_name: string | null;
  user_image: string | null;
  content: string | null;
  created_at: string;
};

type ChatProps = {
  roomId: string;
};

export default function Chat({ roomId }: ChatProps) {
  const { user } = useUser();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [messageInput, setMessageInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const channelRef = React.useRef<RealtimeChannel | null>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  // Load existing messages
  React.useEffect(() => {
    if (!roomId) return;

    const loadMessages = async () => {
      try {
        const { data, error } = await supabase()
          .from('messages')
          .select('*')
          .eq('room_id', parseInt(roomId))
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error loading messages:', error);
          return;
        }

        setMessages(data || []);
        setIsLoading(false);

        // Scroll to bottom after loading messages
        setTimeout(() => {
          if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop =
              scrollAreaRef.current.scrollHeight;
          }
        }, 100);
      } catch (error) {
        console.error('Error loading messages:', error);
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [roomId]);

  // Subscribe to new messages
  React.useEffect(() => {
    if (!roomId || !user) return;

    const supabaseClient = supabase();

    // Subscribe to new messages in this room
    const channel = supabaseClient
      .channel(`room:${roomId}:messages`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${parseInt(roomId)}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          // Only add the message if it's not from the current user
          // (we already added it optimistically for the current user)
          if (newMessage.user_id !== user.id) {
            setMessages((prev) => [...prev, newMessage]);
            // Scroll to bottom on new message
            setTimeout(() => {
              if (scrollAreaRef.current) {
                scrollAreaRef.current.scrollTop =
                  scrollAreaRef.current.scrollHeight;
              }
            }, 100);
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      supabaseClient.removeChannel(channel);
    };
  }, [roomId, user]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user || !roomId) return;

    const content = messageInput.trim();
    setMessageInput('');

    const messageData = {
      room_id: parseInt(roomId), // Convert string roomId to number
      user_id: user.id,
      user_name: user.fullName || user.id,
      user_image: user.imageUrl || 'https://github.com/shadcn.png',
      content: content,
    };

    // Optimistically add message to UI
    const optimisticMessage: Message = {
      ...messageData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMessage]);

    // Scroll to bottom
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
    }, 100);

    try {
      const { error } = await supabase()
        .from('messages')
        .insert([messageData])
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        // Remove optimistic message if there was an error
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== optimisticMessage.id)
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove optimistic message if there was an error
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== optimisticMessage.id)
      );
    }
  };

  return (
    <div className="flex flex-col h-[400px] border rounded-lg bg-card">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Chat</h2>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center">
              <span className="text-sm text-muted-foreground">
                Loading messages...
              </span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center">
              <span className="text-sm text-muted-foreground">
                No messages yet
              </span>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.user_id === user?.id ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={message.user_image || ''}
                    alt={message.user_name || ''}
                  />
                </Avatar>
                <div
                  className={`flex flex-col ${
                    message.user_id === user?.id ? 'items-end' : ''
                  }`}
                >
                  <span className="text-sm text-muted-foreground">
                    {message.user_name}
                  </span>
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[80%] ${
                      message.user_id === user?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
