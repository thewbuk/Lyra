'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useChat } from 'ai/react';
import { useUser, useSession } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import ConnectAccounts from './components/ConnectAccounts';
import ChatSidebar from './components/ChatSidebar';

type ChatMetadata = {
  title: string;
  description: string;
  artifact_id?: string;
};

type Artifact = {
  id: string;
  name: string;
  created_at: string;
};

function ChatPage() {
  const params = useParams();
  const chatId = typeof params?.chatId === 'string' ? params.chatId : '';
  const [fileData, setFileData] = React.useState<{
    type: 'file';
    data: number[];
    mimeType: string;
  } | null>(null);
  const { user } = useUser();
  const { session } = useSession();
  const [chatMetadata, setChatMetadata] = React.useState<ChatMetadata>({
    title: '',
    description: '',
  });
  const [artifacts, setArtifacts] = React.useState<Artifact[]>([]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: '/api/chat',
    ...(chatId ? { id: chatId } : {}),
    body: {
      fileData,
    },
    onFinish: async (message) => {
      if (session && user && chatId) {
        try {
          const clerkToken = await session.getToken({
            template: 'supabase',
          });

          if (!clerkToken) return;

          const { error } = await supabase(clerkToken)
            .from('finance_messages')
            .insert({
              chat_id: chatId,
              user_id: user.id,
              role: message.role,
              content: message.content,
            });

          if (error) {
            console.error('Error storing message:', error);
          }
        } catch (error) {
          console.error('Error getting token:', error);
        }
      }
      setFileData(null);
    },
  });

  React.useEffect(() => {
    if (session && chatId) {
      fetchMessages();
      fetchChatMetadata();
      fetchArtifacts();
    }
  }, [session, chatId]);

  const fetchArtifacts = async () => {
    if (!session || !user?.id) return;

    try {
      const clerkToken = await session.getToken({
        template: 'supabase',
      });

      if (!clerkToken) return;

      const { data, error } = await supabase(clerkToken)
        .from('finance_artifacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching artifacts:', error);
        return;
      }

      setArtifacts(data);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  const fetchChatMetadata = async () => {
    if (!chatId || !session) return;

    try {
      const clerkToken = await session.getToken({
        template: 'supabase',
      });

      if (!clerkToken) return;

      const { data, error } = await supabase(clerkToken)
        .from('finance_chats')
        .select('*')
        .eq('id', chatId)
        .single();

      if (error) {
        console.error('Error fetching chat metadata:', error);
        return;
      }

      if (data) {
        setChatMetadata({
          title: data.title,
          description: data.description,
          artifact_id: data.artifact_id,
        });
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  const updateChatMetadata = async (newMetadata: ChatMetadata) => {
    if (!chatId || !session || !user) return;

    try {
      const clerkToken = await session.getToken({
        template: 'supabase',
      });

      if (!clerkToken) return;

      const { error } = await supabase(clerkToken)
        .from('finance_chats')
        .update({
          title: newMetadata.title,
          description: newMetadata.description,
          artifact_id: newMetadata.artifact_id || null,
        })
        .eq('id', chatId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating chat metadata:', error);
        return;
      }

      setChatMetadata(newMetadata);
      fetchChatMetadata();
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  const fetchMessages = async () => {
    if (!chatId) return;

    try {
      const clerkToken = await session?.getToken({
        template: 'supabase',
      });

      if (!clerkToken) return;

      const { data, error } = await supabase(clerkToken)
        .from('finance_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      type DBMessage = {
        id: string;
        role: 'user' | 'system' | 'assistant' | 'data';
        content: string;
      };

      setMessages([
        {
          id: 'init',
          role: 'system',
          content: `You are a helpful financial assistant. Please provide relevant advice and information about finance.`,
        },
        ...data.map((msg: DBMessage) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
        })),
      ]);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!chatMetadata.artifact_id) {
      alert('Please select an artifact first before uploading files.');
      return;
    }

    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      setFileData({
        type: 'file',
        data: Array.from(uint8Array),
        mimeType: file.type,
      });

      handleInputChange({
        target: {
          value: `I've uploaded a PDF document named "${file.name}". Please analyze this document and provide insights.`,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleRestart = async () => {
    if (!chatId) return;

    try {
      const clerkToken = await session?.getToken({
        template: 'supabase',
      });

      if (!clerkToken) return;

      const { error } = await supabase(clerkToken)
        .from('finance_messages')
        .delete()
        .eq('chat_id', chatId);

      if (error) {
        console.error('Error deleting messages:', error);
        return;
      }

      setMessages([
        {
          id: 'init',
          role: 'system',
          content: `You are a helpful financial assistant. Please provide relevant advice and information about finance.`,
        },
      ]);
      setFileData(null);
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  const handleExampleClick = (text: string) => {
    handleInputChange({
      target: { value: text },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatMetadata.artifact_id && fileData) {
      alert('Please select an artifact before uploading files.');
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      <div className="flex h-[calc(100vh-16rem)] gap-4">
        <Card className="w-80 p-4 border-r shadow-md">
          <ChatSidebar
            chatMetadata={chatMetadata}
            artifacts={artifacts}
            onUpdateMetadata={updateChatMetadata}
          />
        </Card>

        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-start p-4 border-b">
              <div className="flex-1 max-w-2xl"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestart}
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4" />
                Restart Chat
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <MessageList
                messages={messages}
                isLoading={isLoading}
                onInputChange={handleExampleClick}
              />
            </div>
            <div className="p-4 border-t">
              <ChatInput
                input={input}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onFileUpload={handleFileUpload}
                onSubmit={handleSubmitWrapper}
                hasFileData={!!fileData}
              />
            </div>
          </Card>
        </div>
      </div>
      <ConnectAccounts />
    </div>
  );
}

export default ChatPage;
