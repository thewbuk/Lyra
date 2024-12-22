'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageCircle,
  DollarSign,
  Mail,
  CheckCircle,
  Slack,
  Search,
  Filter,
  Plus,
  BarChart2,
  Users,
  Layout,
  ListChecks,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { VisitorsChart } from './components/analytics/VisitorsChart';
import { CampaignCard } from './components/campaigns/CampaignCard';
import { CreatorForm } from './components/creators/CreatorForm';

type Creator = {
  id: number;
  name: string;
  niche: string;
  followers: number;
  status: 'Negotiation' | 'Content Review' | 'Contracted';
  potentialReach: number;
  avatar?: string;
};

const mockCampaigns = [
  {
    id: 1,
    name: 'Summer Fashion Collection',
    status: 'active',
    progress: 65,
    startDate: '2024-06-01',
    endDate: '2024-07-31',
    creators: 12,
    target: '1M reach',
  },
  {
    id: 2,
    name: 'Tech Product Launch',
    status: 'pending',
    progress: 25,
    startDate: '2024-07-01',
    endDate: '2024-08-15',
    creators: 8,
    target: '500K reach',
  },
];

const mockCreators: Creator[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    niche: 'Fashion',
    followers: 250000,
    status: 'Negotiation',
    potentialReach: 500000,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    niche: 'Tech',
    followers: 150000,
    status: 'Content Review',
    potentialReach: 300000,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
];

const LyraCreatorDashboard = () => {
  const [creators, setCreators] = React.useState<Creator[]>(mockCreators);
  const [selectedCreator, setSelectedCreator] = React.useState<Creator | null>(
    null
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lyra Dashboard</h1>
          <p className="text-muted-foreground">
            AI-Powered Creator Marketing Platform
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/lyra/analytics">
            <Button variant="outline">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
          <Link href="/lyra/crm">
            <Button variant="outline">
              <ListChecks className="mr-2 h-4 w-4" />
              CRM
            </Button>
          </Link>
          <Link href="/lyra/creators">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Creators
            </Button>
          </Link>
          <Link href="/lyra/campaigns">
            <Button variant="outline">
              <Layout className="mr-2 h-4 w-4" />
              Campaigns
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
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
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+22 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2M</div>
            <p className="text-xs text-muted-foreground">
              +2.1M from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">
              +0.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>
                  Your latest marketing campaigns
                </CardDescription>
              </div>
              <Link href="/lyra/campaigns">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Creators</CardTitle>
                  <CardDescription>Latest creator activity</CardDescription>
                </div>
                <Link href="/lyra/creators">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {creators.map((creator) => (
                    <div
                      key={creator.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{creator.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {creator.niche}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{creator.status}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>
                Monthly creator and campaign growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VisitorsChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LyraCreatorDashboard;