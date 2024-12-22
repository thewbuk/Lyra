'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SignedOut, useClerk } from '@clerk/nextjs';
import SignUpButton from './SignUpButton';
import { RainbowButton } from './ui/rainbow-button';

export function HomeHero() {
  const { openSignUp } = useClerk();

  return (
    <div className="mx-auto max-w-4xl p-4">
      <section className="flex h-[75vh] items-center md:h-[50vh]">
        <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
          <Link href={`/pro`}>
            <RainbowButton>Pro</RainbowButton>
          </Link>

          <h1 className="text-6xl font-bold">
            Join YouTube Watch Rooms Together!
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Lyra is a platform for watching YouTube channels with friends
            around the world.
            <br />
            Create or join a room to start watching together.
          </p>
          <div className="flex gap-2">
            <SignUpButton />
            <Link href={`/changelog`}>
              <Button variant="outline">Changelog</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
