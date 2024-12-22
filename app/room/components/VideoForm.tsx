'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useSocket } from '@/lib/hooks/use-socket';

const VideoSchema = z.object({
  url: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .refine(
      (val) =>
        ['youtube.com', 'youtu.be'].some((platform) => val.includes(platform)),
      {
        message: 'Please enter a valid YouTube URL.',
      }
    ),
});

type VideoForm = z.infer<typeof VideoSchema>;

type VideoFormProps = {
  onSubmit: (data: VideoForm) => Promise<void>;
  isLoading: boolean;
};

const VideoForm = ({ onSubmit, isLoading }: VideoFormProps) => {
  const { sendMessage } = useSocket();
  const form = useForm<VideoForm>({
    resolver: zodResolver(VideoSchema),
    defaultValues: { url: '' },
  });

  const handleSubmit = async (data: VideoForm) => {
    try {
      // First update the database
      await onSubmit(data);

      // Then notify all clients through WebSocket
      sendMessage({
        command: 'videoUpdate',
        videoUrl: data.url,
      });

      // Reset the form
      form.reset();
    } catch (error) {
      console.error('Error submitting video:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Video URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter YouTube URL"
                  {...field}
                  className="bg-input text-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Play Video'}
        </Button>
      </form>
    </Form>
  );
};

export default VideoForm;
