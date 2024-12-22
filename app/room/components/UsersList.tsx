'use client';

import * as React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, UserPlus, Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@clerk/nextjs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type User = {
  id: string;
  name: string;
  image: string;
};

type UsersListProps = {
  users: User[];
  isLoading: boolean;
  onRefresh: () => void;
};

const UsersList = ({ users, isLoading, onRefresh }: UsersListProps) => {
  const { user } = useUser();
  const [invitingUsers, setInvitingUsers] = React.useState<Set<string>>(
    new Set()
  );
  const [error, setError] = React.useState<string | null>(null);
  const [pendingRequests, setPendingRequests] = React.useState<Set<string>>(
    new Set()
  );

  React.useEffect(() => {
    if (!user?.id) return;
    loadPendingRequests();
  }, [user?.id]);

  const loadPendingRequests = async () => {
    if (!user?.id) return;

    // Get requests sent by current user
    const { data: sentRequests } = await supabase()
      .from('friend_requests')
      .select('receiver_clerk_id')
      .eq('sender_clerk_id', user.id)
      .eq('status', 'pending');

    // Get requests received by current user
    const { data: receivedRequests } = await supabase()
      .from('friend_requests')
      .select('sender_clerk_id')
      .eq('receiver_clerk_id', user.id)
      .eq('status', 'pending');

    const pendingIds = new Set([
      ...(sentRequests?.map((r) => r.receiver_clerk_id) || []),
      ...(receivedRequests?.map((r) => r.sender_clerk_id) || []),
    ]);

    setPendingRequests(pendingIds);
  };

  const handleSendInvite = async (userId: string) => {
    if (!user?.id) return;
    setError(null);
    setInvitingUsers((prev) => new Set(prev).add(userId));

    try {
      // Check if friend request already exists
      const { data: existingRequest } = await supabase()
        .from('friend_requests')
        .select('*')
        .eq('sender_clerk_id', user.id)
        .eq('receiver_clerk_id', userId)
        .single();

      if (existingRequest) {
        // Update UI to show pending state instead of showing error
        setPendingRequests((prev) => new Set([...prev, userId]));
        return;
      }

      // Get or create sender auth user
      const { data: senderUser, error: senderError } = await supabase()
        .from('users')
        .select('id')
        .eq('clerk_id', user.id)
        .single();

      let finalSenderId: string;

      if (senderError) {
        // Create sender user if doesn't exist
        const { data: newSender, error: createSenderError } = await supabase()
          .from('users')
          .insert([{ clerk_id: user.id }])
          .select()
          .single();

        if (createSenderError) {
          console.error('Error creating sender:', createSenderError);
          throw new Error('Failed to create sender user');
        }
        finalSenderId = newSender.id;
      } else {
        finalSenderId = senderUser.id;
      }

      // Get or create receiver auth user
      const { data: receiverUser, error: receiverError } = await supabase()
        .from('users')
        .select('id')
        .eq('clerk_id', userId)
        .single();

      let finalReceiverId: string;

      if (receiverError) {
        // Create receiver user if doesn't exist
        const { data: newReceiver, error: createReceiverError } =
          await supabase()
            .from('users')
            .insert([{ clerk_id: userId }])
            .select()
            .single();

        if (createReceiverError) {
          console.error('Error creating receiver:', createReceiverError);
          throw new Error('Failed to create receiver user');
        }
        finalReceiverId = newReceiver.id;
      } else {
        finalReceiverId = receiverUser.id;
      }

      // Create friend request using the UUID from public.users
      const { error: friendRequestError } = await supabase()
        .from('friend_requests')
        .insert([
          {
            sender_id: finalSenderId,
            receiver_id: finalReceiverId,
            status: 'pending',
            sender_clerk_id: user.id,
            receiver_clerk_id: userId,
          },
        ]);

      if (friendRequestError) {
        console.error('Friend request error:', friendRequestError);
        throw friendRequestError;
      }

      // Create notification with the correct user_id from public.users
      const { error: notificationError } = await supabase()
        .from('notifications')
        .insert([
          {
            user_id: finalReceiverId, // Use the receiver's UUID from public.users
            type: 'friend_request',
            content: `${user.fullName || user.username || 'Someone'} sent you a friend request`,
            receiver_clerk_id: userId,
            sender_clerk_id: user.id,
            is_read: false,
          },
        ]);

      if (notificationError) {
        console.error('Notification error:', notificationError);
        throw notificationError;
      }

      // Update local state to show pending
      setPendingRequests((prev) => new Set([...prev, userId]));
      onRefresh();
    } catch (err: any) {
      console.error('Error sending invite:', err);
      setError('Failed to send invite. Please try again.');
    } finally {
      setInvitingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  return (
    <div className="border rounded-lg bg-card p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Users in Room</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
        </Button>
      </div>
      {error && (
        <div className="mb-4 p-2 text-sm text-destructive bg-destructive/10 rounded">
          {error}
        </div>
      )}
      <div className="space-y-2">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))
          : users.map((roomUser) => (
              <div
                key={roomUser.id}
                className="flex items-center justify-between gap-2 p-2 hover:bg-accent rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={roomUser.image}
                      alt={`${roomUser.name} avatar`}
                    />
                    <AvatarFallback>
                      {roomUser.name?.[0]?.toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">
                    {roomUser.name}
                  </span>
                </div>
                {user?.id !== roomUser.id && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendInvite(roomUser.id)}
                          disabled={
                            invitingUsers.has(roomUser.id) ||
                            pendingRequests.has(roomUser.id)
                          }
                          className={cn(
                            pendingRequests.has(roomUser.id) &&
                              'text-muted-foreground'
                          )}
                        >
                          {invitingUsers.has(roomUser.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : pendingRequests.has(roomUser.id) ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <UserPlus className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {invitingUsers.has(roomUser.id)
                          ? 'Sending invite...'
                          : pendingRequests.has(roomUser.id)
                            ? 'Invite pending'
                            : 'Send invite'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default UsersList;
