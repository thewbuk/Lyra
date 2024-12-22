'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WelcomeSection } from './WelcomeSection';
import { QuickStats } from './QuickStats';
import { ActivityTab } from './ActivityTab';
import { RoomsTab } from './RoomsTab';
import { FriendsTab } from './FriendsTab';
import { UserStats } from './UserStats';
import { CategoryStats } from './CategoryStats';

interface DashboardProps {
  userName?: string | null;
}

export const Dashboard = ({ userName }: DashboardProps) => {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-8">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent" />

      <WelcomeSection userName={userName} />
      <QuickStats />

      <Tabs defaultValue="activity" className="space-y-4 mb-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="rooms">My Rooms</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <ActivityTab />
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <RoomsTab />
        </TabsContent>

        <TabsContent value="friends" className="space-y-4">
          <FriendsTab />
        </TabsContent>
      </Tabs>
      <div className="space-y-4">
        <UserStats />
        <CategoryStats />
      </div>
    </div>
  );
};
