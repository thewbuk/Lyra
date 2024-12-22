'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, useSession } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare, FolderPlus } from 'lucide-react';

type FinanceChat = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  user_id: string | null;
};

type Artifact = {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
};

function FinancePage() {
  const [chats, setChats] = useState<FinanceChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isArtifactsLoading, setIsArtifactsLoading] = useState(true);
  const { user } = useUser();
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && user?.id) {
      fetchChats();
      fetchArtifacts();
    }
  }, [session, user?.id]);

  const fetchChats = async () => {
    if (!session || !user?.id) return;

    setIsLoading(true);
    let clerkToken: string | undefined;
    try {
      clerkToken =
        (await session?.getToken({
          template: 'supabase',
        })) || undefined;
    } catch (error) {
      console.error('Error getting token:', error);
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase(clerkToken)
      .from('finance_chats')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching chats:', error);
      setIsLoading(false);
      return;
    }

    setChats(data as FinanceChat[]);
    setIsLoading(false);
  };

  const fetchArtifacts = async () => {
    if (!session || !user?.id) return;

    setIsArtifactsLoading(true);
    let clerkToken: string | undefined;
    try {
      clerkToken =
        (await session?.getToken({
          template: 'supabase',
        })) || undefined;
    } catch (error) {
      console.error('Error getting token:', error);
      setIsArtifactsLoading(false);
      return;
    }

    const { data, error } = await supabase(clerkToken)
      .from('finance_artifacts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching artifacts:', error);
      setIsArtifactsLoading(false);
      return;
    }

    setArtifacts(data as Artifact[]);
    setIsArtifactsLoading(false);
  };

  const createNewChat = async () => {
    if (!session || !user?.id) return;

    let clerkToken: string | undefined;
    try {
      clerkToken =
        (await session?.getToken({
          template: 'supabase',
        })) || undefined;
    } catch (error) {
      console.error('Error getting token:', error);
      return;
    }

    const newChat = {
      title: 'New Chat',
      description: 'A new financial discussion',
      user_id: user.id,
    };

    const { data, error } = await supabase(clerkToken)
      .from('finance_chats')
      .insert(newChat)
      .select()
      .single();

    if (error) {
      console.error('Error creating chat:', error);
      return;
    }

    router.push(`/finance/${data.id}`);
  };

  const createNewArtifact = async () => {
    if (!session || !user?.id) return;

    let clerkToken: string | undefined;
    try {
      clerkToken =
        (await session?.getToken({
          template: 'supabase',
        })) || undefined;
    } catch (error) {
      console.error('Error getting token:', error);
      return;
    }

    const newArtifact = {
      name: 'New Artifact',
      user_id: user.id,
    };

    const { data, error } = await supabase(clerkToken)
      .from('finance_artifacts')
      .insert(newArtifact)
      .select()
      .single();

    if (error) {
      console.error('Error creating artifact:', error);
      return;
    }

    router.push(`/finance/artifacts/${data.id}`);
  };

  const SkeletonCard = () => (
    <Card className="h-[200px]">
      <CardHeader>
        <Skeleton className="h-8 w-8 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
    </Card>
  );

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-8">
        {}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Finance Assistant
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Get help with your financial questions and decisions
          </p>
        </div>

        {}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Chats</h2>
          <Button
            onClick={createNewChat}
            className="inline-flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Start New Chat
          </Button>
        </div>

        {}
        {chats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? [...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="transition-transform hover:scale-105"
                  >
                    <SkeletonCard />
                  </div>
                ))
              : chats.map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/finance/${chat.id}`}
                    className="transition-transform hover:scale-105"
                  >
                    <Card className="h-full hover:bg-accent">
                      <CardHeader className="text-center">
                        <div className="flex justify-center">
                          <MessageSquare className="h-8 w-8 mb-2" />
                        </div>
                        <CardTitle>{chat.title}</CardTitle>
                        <CardDescription>{chat.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
          </div>
        )}

        {}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Artifacts</h2>
            <Button
              onClick={createNewArtifact}
              className="inline-flex items-center gap-2"
            >
              <FolderPlus className="h-4 w-4" />
              Create New Artifact
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isArtifactsLoading ? (
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="transition-transform hover:scale-105"
                >
                  <SkeletonCard />
                </div>
              ))
            ) : artifacts.length > 0 ? (
              artifacts.map((artifact) => (
                <Link
                  key={artifact.id}
                  href={`/finance/artifacts/${artifact.id}`}
                  className="transition-transform hover:scale-105"
                >
                  <Card className="h-full hover:bg-accent">
                    <CardHeader className="text-center">
                      <div className="flex justify-center">
                        <FolderPlus className="h-8 w-8 mb-2" />
                      </div>
                      <CardTitle>{artifact.name}</CardTitle>
                      <CardDescription>
                        Created on{' '}
                        {new Date(artifact.created_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                No artifacts yet. Create one to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancePage;
