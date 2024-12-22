import { supabase } from './supabaseClient';
import type { User } from '@/types/database';

export const handleUserCreation = async (clerkId: string): Promise<User> => {
  try {
    // First, check if user exists
    const { data: existingUser, error: fetchError } = await supabase()
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingUser) {
      return existingUser;
    }

    // User doesn't exist, create new user
    const { data: newUser, error: insertError } = await supabase()
      .from('users')
      .insert([
        {
          clerk_id: clerkId,
          friends: [], // Initialize empty friends array
          // Let Postgres generate the UUID
          id: undefined,
        },
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    return newUser;
  } catch (error) {
    console.error('Error in handleUserCreation:', error);
    throw error;
  }
};

export const addFriend = async (
  userId: string,
  friendId: string
): Promise<void> => {
  try {
    const { error } = await supabase().rpc('add_friend', {
      user_id: userId,
      friend_id: friendId,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error in addFriend:', error);
    throw error;
  }
};

export const removeFriend = async (
  userId: string,
  friendId: string
): Promise<void> => {
  try {
    const { error } = await supabase().rpc('remove_friend', {
      user_id: userId,
      friend_id: friendId,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error in removeFriend:', error);
    throw error;
  }
};

export const getUserFriends = async (userId: string): Promise<User[]> => {
  try {
    const { data: user, error: userError } = await supabase()
      .from('users')
      .select('friends')
      .eq('id', userId)
      .single();

    if (userError) throw userError;
    if (!user?.friends?.length) return [];

    // Get all friend users
    const { data: friends, error: friendsError } = await supabase()
      .from('users')
      .select('*')
      .in('id', user.friends);

    if (friendsError) throw friendsError;
    return friends || [];
  } catch (error) {
    console.error('Error in getUserFriends:', error);
    throw error;
  }
};
