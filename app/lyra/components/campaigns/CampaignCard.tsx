'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Target,
  Users,
  Calendar as CalendarIcon,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CampaignCardProps = {
  campaign: {
    id: number;
    name: string;
    status: string;
    progress: number;
    startDate: string;
    endDate: string;
    creators: number;
    target: string;
  };
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  React.useEffect(() => {
    if (campaign.startDate) {
      setStartDate(new Date(campaign.startDate));
    }
    if (campaign.endDate) {
      setEndDate(new Date(campaign.endDate));
    }
  }, [campaign.startDate, campaign.endDate]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription>Campaign Details</CardDescription>
          </div>
          <Badge className={getStatusColor(campaign.status)}>
            {campaign.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{campaign.progress}%</span>
            </div>
            <Progress value={campaign.progress} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="text-muted-foreground">Duration</p>
                <p className="font-medium">
                  {campaign.startDate} - {campaign.endDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="text-muted-foreground">Creators</p>
                <p className="font-medium">{campaign.creators}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="text-muted-foreground">Target</p>
                <p className="font-medium">{campaign.target}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Campaign Details
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed information about {campaign.name}
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm">Status:</span>
                      <span className="col-span-2 text-sm">
                        {campaign.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm">Progress:</span>
                      <span className="col-span-2 text-sm">
                        {campaign.progress}%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm">Start Date:</span>
                      <span className="col-span-2 text-sm">
                        {campaign.startDate}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm">End Date:</span>
                      <span className="col-span-2 text-sm">
                        {campaign.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover open={isEditOpen} onOpenChange={setIsEditOpen}>
              <PopoverTrigger asChild>
                <Button size="sm">Edit Campaign</Button>
              </PopoverTrigger>
              <PopoverContent className="w-96">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Edit Campaign</h4>
                    <p className="text-sm text-muted-foreground">
                      Make changes to {campaign.name}
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Campaign Name</Label>
                      <Input
                        id="name"
                        defaultValue={campaign.name}
                        className="h-8"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue={campaign.status}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="target">Target</Label>
                      <Input
                        id="target"
                        defaultValue={campaign.target}
                        className="h-8"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal h-8',
                                !startDate && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? (
                                format(startDate, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label>End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal h-8',
                                !endDate && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? (
                                format(endDate, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notifications" />
                      <Label htmlFor="notifications">
                        Enable notifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="autoPublish" />
                      <Label htmlFor="autoPublish">Auto-publish content</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => setIsEditOpen(false)}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
