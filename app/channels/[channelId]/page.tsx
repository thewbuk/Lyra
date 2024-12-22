'use client';
import React from 'react';
import { Timeline } from '@/components/ui/timeline';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export default function Changelog() {
  return (
    <>
      <div className="mx-auto max-w-4xl p-24">
        <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-4xl font-bold">PRO</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Stay up to date with the latest changes and improvements in Cyclon.
          </p>
        </div>
      </div>
    </>
  );
}
