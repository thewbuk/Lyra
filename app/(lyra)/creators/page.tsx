'use client';

import * as React from 'react';
import { CreatorForm } from '../components/creators/CreatorForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { EmailAutomationDemo } from '../components/creators/EmailAutomationDemo';
import { NegotiationStatus } from '../components/creators/NegotiationStatus';

type Creator = {
  id: number;
  name: string;
  niche: string;
  followers: number;
  status: string;
  image: string;
  email: string;
};

const mockCreators: Creator[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    niche: 'Fashion',
    followers: 250000,
    status: 'Active',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    email: 'emma@example.com',
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    niche: 'Tech',
    followers: 150000,
    status: 'Pending',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    email: 'alex@example.com',
  },
  {
    id: 3,
    name: 'Sarah Kim',
    niche: 'Fitness',
    followers: 180000,
    status: 'Active',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    email: 'sarah@example.com',
  },
];

export default function CreatorsPage() {
  const [creators, setCreators] = React.useState<Creator[]>(mockCreators);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleAddCreator = (data: any) => {
    const newCreator = {
      id: creators.length + 1,
      ...data,
      status: 'Pending',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
    };
    setCreators([...creators, newCreator]);
  };

  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.niche.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BackButton />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Creators</h1>
          <p className="text-muted-foreground">
            Manage your creator relationships
          </p>
        </div>
        <CreatorForm onSubmit={handleAddCreator} />
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search creators..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCreators.map((creator) => (
            <Card key={creator.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={creator.image} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {creator.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {creator.email}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      creator.status === 'Active' ? 'default' : 'secondary'
                    }
                  >
                    {creator.status}
                  </Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Niche</p>
                    <p className="text-sm font-medium">{creator.niche}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="text-sm font-medium">
                      {creator.followers.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <EmailAutomationDemo
                    creatorName={creator.name}
                    creatorEmail={creator.email}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <NegotiationStatus />
        </div>
      </div>
    </div>
  );
}
