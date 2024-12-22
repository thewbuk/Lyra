export type FriendRequest = {
  id: number;
  sender_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  sender_clerk_id: string | null;
  receiver_clerk_id: string | null;
};

export type Notification = {
  id: number;
  user_id: string;
  type: string;
  content: string;
  is_read: boolean;
  created_at: string;
  receiver_clerk_id: string | null;
  sender_clerk_id: string | null;
};

export type User = {
  id: string;
  clerk_id: string;
  created_at: string;
  friends: string[]; // Array of user UUIDs
};
