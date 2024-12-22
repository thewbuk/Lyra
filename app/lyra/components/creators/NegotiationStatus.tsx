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
import { Badge } from '@/components/ui/badge';
import {
  HandshakeIcon,
  DollarSign,
  FileCheck,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: number;
  sender: 'lyra' | 'creator';
  content: string;
  timestamp: string;
};

type NegotiationStep = {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
};

type NegotiationStatus = {
  id: number;
  creator: string;
  currentOffer: number;
  counterOffer?: number;
  status: 'pending' | 'accepted' | 'negotiating';
  lastUpdate: string;
  paymentStatus: 'pending' | 'processing' | 'completed';
  messages: Message[];
  steps: NegotiationStep[];
};

const mockNegotiations: NegotiationStatus[] = [
  {
    id: 1,
    creator: 'Emma Johnson',
    currentOffer: 5000,
    status: 'negotiating',
    counterOffer: 6000,
    lastUpdate: '2 hours ago',
    paymentStatus: 'pending',
    messages: [
      {
        id: 1,
        sender: 'lyra',
        content: 'Initial offer: $5,000 for the campaign collaboration',
        timestamp: '2 days ago',
      },
      {
        id: 2,
        sender: 'creator',
        content: 'Counter-offer: $6,000 with additional story posts',
        timestamp: '1 day ago',
      },
      {
        id: 3,
        sender: 'lyra',
        content:
          'Reviewing your counter-offer. We appreciate the additional value proposition.',
        timestamp: '2 hours ago',
      },
      {
        id: 4,
        sender: 'creator',
        content: 'Counter-offer: $6,000 with additional story posts',
        timestamp: '1 day ago',
      },
      {
        id: 5,
        sender: 'lyra',
        content:
          'Reviewing your counter-offer. We appreciate the additional value proposition.',
        timestamp: '2 hours ago',
      },
    ],
    steps: [
      {
        id: 1,
        title: 'Initial Contact',
        status: 'completed',
        date: '3 days ago',
      },
      {
        id: 2,
        title: 'Offer Made',
        status: 'completed',
        date: '2 days ago',
      },
      {
        id: 3,
        title: 'Counter-Offer Received',
        status: 'completed',
        date: '1 day ago',
      },
      {
        id: 4,
        title: 'Final Agreement',
        status: 'current',
      },
      {
        id: 5,
        title: 'Contract Signing',
        status: 'upcoming',
      },
    ],
  },
  {
    id: 2,
    creator: 'Alex Rodriguez',
    currentOffer: 3500,
    status: 'accepted',
    lastUpdate: '1 day ago',
    paymentStatus: 'processing',
    messages: [
      {
        id: 1,
        sender: 'lyra',
        content: 'Initial offer: $3,500 for the tech review series',
        timestamp: '3 days ago',
      },
      {
        id: 2,
        sender: 'creator',
        content: 'The offer aligns with my expectations. Happy to proceed.',
        timestamp: '2 days ago',
      },
    ],
    steps: [
      {
        id: 1,
        title: 'Initial Contact',
        status: 'completed',
        date: '4 days ago',
      },
      {
        id: 2,
        title: 'Offer Made',
        status: 'completed',
        date: '3 days ago',
      },
      {
        id: 3,
        title: 'Offer Accepted',
        status: 'completed',
        date: '2 days ago',
      },
      {
        id: 4,
        title: 'Contract Signed',
        status: 'completed',
        date: '1 day ago',
      },
      {
        id: 5,
        title: 'Payment Processing',
        status: 'current',
      },
    ],
  },
  {
    id: 3,
    creator: 'Sarah Kim',
    currentOffer: 4500,
    status: 'pending',
    lastUpdate: 'Just now',
    paymentStatus: 'pending',
    messages: [
      {
        id: 1,
        sender: 'lyra',
        content: 'Initial offer: $4,500 for fitness content series',
        timestamp: 'Just now',
      },
    ],
    steps: [
      {
        id: 1,
        title: 'Initial Contact',
        status: 'completed',
        date: '1 day ago',
      },
      {
        id: 2,
        title: 'Offer Made',
        status: 'current',
      },
      {
        id: 3,
        title: 'Response Pending',
        status: 'upcoming',
      },
    ],
  },
];

export function NegotiationStatus() {
  const [selectedNegotiation, setSelectedNegotiation] =
    React.useState<NegotiationStatus | null>(null);

  const getStatusBadge = (status: NegotiationStatus['status']) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'negotiating':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Negotiating</Badge>
        );
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  const getPaymentStatusBadge = (
    status: NegotiationStatus['paymentStatus']
  ) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  const getStepStatusColor = (status: NegotiationStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'current':
        return 'text-blue-600';
      case 'upcoming':
        return 'text-gray-400';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandshakeIcon className="h-5 w-5" />
            Active Negotiations
          </CardTitle>
          <CardDescription>
            Real-time status of ongoing creator negotiations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creator</TableHead>
                <TableHead>Current Offer</TableHead>
                <TableHead>Counter Offer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNegotiations.map((negotiation) => (
                <TableRow key={negotiation.id}>
                  <TableCell className="font-medium">
                    {negotiation.creator}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {negotiation.currentOffer}
                    </span>
                  </TableCell>
                  <TableCell>
                    {negotiation.counterOffer ? (
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {negotiation.counterOffer}
                      </span>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(negotiation.status)}</TableCell>
                  <TableCell>
                    {getPaymentStatusBadge(negotiation.paymentStatus)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {negotiation.lastUpdate}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedNegotiation(negotiation)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedNegotiation}
        onOpenChange={() => setSelectedNegotiation(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Negotiation Details - {selectedNegotiation?.creator}
            </DialogTitle>
            <DialogDescription>
              View negotiation progress and communication history
            </DialogDescription>
          </DialogHeader>

          {selectedNegotiation && (
            <div className="grid gap-6">
              {/* Negotiation Steps */}
              <div>
                <h3 className="font-semibold mb-4">Progress</h3>
                <div className="space-y-4">
                  {selectedNegotiation.steps.map((step) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-2 ${getStepStatusColor(step.status)}`}
                      >
                        {step.status === 'completed' ? (
                          <FileCheck className="h-4 w-4" />
                        ) : step.status === 'current' ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${getStepStatusColor(step.status)}`}
                        >
                          {step.title}
                        </p>
                        {step.date && (
                          <p className="text-sm text-muted-foreground">
                            {step.date}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div>
                <h3 className="font-semibold mb-4">Communication History</h3>
                <ScrollArea className="h-[400px] rounded-md border p-4">
                  <div className="space-y-4">
                    {selectedNegotiation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${
                          message.sender === 'lyra'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.sender === 'lyra'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
