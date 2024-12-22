'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type EmailStep = {
  id: number;
  subject: string;
  status: 'sent' | 'scheduled' | 'draft' | 'failed';
  scheduledFor?: string;
  sentAt?: string;
  content: string;
};

type EmailAutomationProps = {
  creatorName: string;
  creatorEmail: string;
};

export function EmailAutomationDemo({
  creatorName,
  creatorEmail,
}: EmailAutomationProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const emailSteps: EmailStep[] = [
    {
      id: 1,
      subject: 'Initial Outreach',
      status: 'sent',
      sentAt: '2 days ago',
      content: `Hi ${creatorName},\n\nI hope this email finds you well! We've been following your content and are impressed with your work. We'd love to explore a potential collaboration with you for our upcoming campaign.\n\nBest regards,\nLyra Team`,
    },
    {
      id: 2,
      subject: 'Campaign Details',
      status: 'scheduled',
      scheduledFor: 'Tomorrow at 10:00 AM',
      content: `Hi ${creatorName},\n\nThank you for your interest! Here are the detailed campaign requirements and deliverables we discussed.\n\nLooking forward to your response,\nLyra Team`,
    },
    {
      id: 3,
      subject: 'Follow-up',
      status: 'draft',
      content: `Hi ${creatorName},\n\nJust following up on our previous conversation about the campaign collaboration. Let me know if you have any questions!\n\nBest,\nLyra Team`,
    },
  ];

  const getStatusBadge = (status: EmailStep['status']) => {
    switch (status) {
      case 'sent':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Sent
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Mail className="mr-1 h-3 w-3" />
            Draft
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Mail className="mr-2 h-4 w-4" />
          View Email Automation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email Automation - {creatorName}</DialogTitle>
          <DialogDescription>
            View and manage automated email sequences for {creatorEmail}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {emailSteps.map((step) => (
            <Card key={step.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{step.subject}</CardTitle>
                  {getStatusBadge(step.status)}
                </div>
                <CardDescription>
                  {step.sentAt && `Sent ${step.sentAt}`}
                  {step.scheduledFor && `Scheduled for ${step.scheduledFor}`}
                  {!step.sentAt && !step.scheduledFor && 'Not scheduled'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm">
                  {step.content}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
