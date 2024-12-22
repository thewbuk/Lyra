'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from 'sonner';

type CreatorFormProps = {
  onSubmit: (data: any) => void;
  initialData?: any;
};

export function CreatorForm({ onSubmit, initialData }: CreatorFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    niche: initialData?.niche || '',
    followers: initialData?.followers || '',
    email: initialData?.email || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success('Creator information saved!');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          {initialData ? 'Edit Creator' : 'Add Creator'}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>
              {initialData ? 'Edit Creator' : 'Add New Creator'}
            </SheetTitle>
            <SheetDescription>
              Make changes to creator information here. Click save when you're
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="niche" className="text-right">
                Niche
              </Label>
              <Input
                id="niche"
                value={formData.niche}
                onChange={(e) =>
                  setFormData({ ...formData, niche: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="followers" className="text-right">
                Followers
              </Label>
              <Input
                id="followers"
                type="number"
                value={formData.followers}
                onChange={(e) =>
                  setFormData({ ...formData, followers: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
