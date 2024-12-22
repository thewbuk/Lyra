'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const CreateRoomSchema = z.object({
  roomName: z.string().min(1, 'Room name is required'),
  category: z.string().min(1, 'Category is required'),
  isPublic: z.boolean().default(true),
});

type CreateRoomForm = z.infer<typeof CreateRoomSchema>;

interface Category {
  id: number;
  name: string;
  description: string;
}

const CreateRoomPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const supabaseClient = supabase();
      const { data, error } = await supabaseClient
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  const form = useForm<CreateRoomForm>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      roomName: '',
      category: '',
      isPublic: true,
    },
  });

  const onSubmit = async (data: CreateRoomForm) => {
    const supabaseClient = supabase();
    const { data: room, error } = await supabaseClient
      .from('rooms')
      .insert([
        {
          video_url: '',
          room_name: data.roomName,
          category: data.category,
          is_public: data.isPublic,
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error creating room:', error);
      return;
    }

    router.push(`/room/${room.id}`);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Create a Video Room
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Share the room ID with your friends to watch videos together in
              real-time.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="roomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Room Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter room name"
                          {...field}
                          className="bg-input text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input text-foreground">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-foreground">
                          Public Room
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Make this room visible to everyone
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create Room
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomPage;
