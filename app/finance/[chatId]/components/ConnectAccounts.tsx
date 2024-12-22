'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Institution = {
  id: string;
  name: string;
  icon: string;
};

const institutions: Institution[] = [
  {
    id: 'chase',
    name: 'Chase',
    icon: '🏦',
  },
  {
    id: 'bofa',
    name: 'Bank of America',
    icon: '🏛️',
  },
  {
    id: 'wells',
    name: 'Wells Fargo',
    icon: '💰',
  },
  {
    id: 'citi',
    name: 'Citibank',
    icon: '🏢',
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    icon: '📈',
  },
  {
    id: 'robinhood',
    name: 'Robinhood',
    icon: '🪶',
  },
];

const ConnectAccounts = () => {
  const [selectedInstitution, setSelectedInstitution] =
    React.useState<Institution | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleInstitutionClick = (institution: Institution) => {
    setSelectedInstitution(institution);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in real app would handle auth/connection
    setIsDialogOpen(false);
    setSelectedInstitution(null);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Connect Your Accounts</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {institutions.map((institution) => (
          <Card
            key={institution.id}
            className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => handleInstitutionClick(institution)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{institution.icon}</span>
              <span className="font-medium">{institution.name}</span>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedInstitution?.icon} Connect to {selectedInstitution?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full">
              Connect Account
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConnectAccounts;
