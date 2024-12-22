'use client';
import { Pattern } from '@/components/ui/pattern';
import { LandingPage } from '@/components/landing/LandingPage';
import { useUser } from '@clerk/nextjs';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <>
      <Pattern variant="checkered" />
      {!isSignedIn ? <LandingPage /> : <Dashboard userName={user?.firstName} />}
    </>
  );
}
