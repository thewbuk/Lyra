'use client';

import * as React from 'react';
import { CreatorCRMTable } from '../components/crm/CreatorCRMTable';
import { CampaignCRMTable } from '../components/crm/CampaignCRMTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Overview } from '../components/crm/Overview';
import { RecentActivity } from '../components/crm/RecentActivity';
import { BackButton } from '../components/ui/BackButton';

export default function CRMPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <BackButton />
          <h1 className="text-3xl font-bold mt-2">CRM Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your creator relationships and campaigns in one place
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Creators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Deal Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,200</div>
            <p className="text-xs text-muted-foreground">
              +$420 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>
        <TabsContent value="creators">
          <CreatorCRMTable />
        </TabsContent>
        <TabsContent value="campaigns">
          <CampaignCRMTable />
        </TabsContent>
        <TabsContent value="activity">
          <RecentActivity />
        </TabsContent>
      </Tabs>
    </div>
  );
}
