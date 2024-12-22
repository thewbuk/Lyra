'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

function InviteUser({ chatId }: { chatId: string }) {
  const [open, setOpen] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');

  useEffect(() => {
    setInviteUrl(`${window.location.origin}/room/${chatId}`);
  }, [chatId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon className="mr-1" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Invite Link</DialogTitle>
          <DialogDescription>
            Share this link with others to invite them to the chat.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={inviteUrl} readOnly className="flex-1" />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUser;
