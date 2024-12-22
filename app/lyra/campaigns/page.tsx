'use client';

import * as React from 'react';
import { CampaignCard } from '../components/campaigns/CampaignCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';

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
  {
    id: 3,
    name: 'Fitness Challenge',
    status: 'completed',
    progress: 100,
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    creators: 15,
    target: '2M reach',
  },
];

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [campaigns, setCampaigns] = React.useState(mockCampaigns);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BackButton />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your marketing campaigns
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
