'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { MainNav } from '@/components/navbar/MainNav';
import { MobileNav } from '@/components/navbar/MobileNav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button, buttonVariants } from '@/components/ui/button';
import { CommandSearch } from '../command-search';
import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SignUpButton from '../SignUpButton';
import { Bell, Cog, LayoutDashboard, LogOut } from 'lucide-react';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

type Category = {
  id: number;
  name: string;
  description: string;
};

type Notification = {
  id: number;
  user_id: string;
  type: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

export function SiteHeader() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [categories, setCategories] = useState<Category[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase()
        .from('categories')
        .select('*')
        .order('name')
        .limit(3);

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const { data } = await supabase()
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.is_read).length);
      }
    };

    fetchNotifications();

    // Subscribe to new notifications
    const channel = supabase()
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  const markAsRead = async (notificationId: number) => {
    await supabase()
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav categories={categories} />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {/* <CommandSearch /> */}
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}
            {/* <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <ThemeToggle />
            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName || 'User'}
                    />
                    <AvatarFallback>
                      {user?.fullName?.charAt(0) ||
                        user?.username?.charAt(0) ||
                        'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.fullName || user?.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <div>
                      <DiscordLogoIcon className="mr-2 h-4 w-4" />
                      <Link href="https://discord.gg/6Hjumj65">Discord</Link>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <div>
                      <LayoutDashboard className="mr-2 h-4 w-4" />

                      <Link href="/">Dashboard</Link>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <div>
                      <Cog className="mr-2 h-4 w-4" />

                      <Link href="/settings">Settings</Link>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
            <SignUpButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
