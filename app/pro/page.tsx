'use client';
import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    price: { monthly: '$0', annually: '$0' },
    description: 'Essential features for getting started with Cyclon.',
    features: [
      'Join public watch rooms',
      'Basic chat features',
      'Limited to 720p quality',
      'Ad-supported experience',
      '2 concurrent viewers',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    price: { monthly: '$9.99', annually: '$99' },
    description:
      'Perfect for active users who want more control and better quality.',
    features: [
      'Everything in Free',
      'Create private rooms',
      'Up to 4K quality',
      'Ad-free experience',
      'Custom room settings',
      'Priority support',
      '10 concurrent viewers',
      'Room analytics',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: { monthly: 'Custom', annually: 'Custom' },
    description: 'Advanced features for organizations and large communities.',
    features: [
      'Everything in Pro',
      'Unlimited rooms',
      'Custom branding',
      'API access',
      'Advanced analytics',
      'Dedicated support',
      'Unlimited viewers',
      'SLA guarantee',
    ],
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-gradient-to-b from-primary/20 blur-3xl" />
        <div className="absolute -bottom-1/2 left-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-t from-primary/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Simple,{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative">transparent pricing</span>
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-full h-[0.58em] w-full fill-primary/20"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </motion.svg>
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Choose the perfect plan for your needs. All plans include our core
              features.
            </p>
          </motion.div>

          {/* Pricing Toggle */}
          <div className="mt-8 flex justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              Monthly billing
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  'relative flex h-full flex-col p-6',
                  tier.featured && 'border-primary shadow-lg'
                )}
              >
                {tier.featured && (
                  <div className="absolute -top-5 right-6">
                    <Badge className="h-10 rounded-full px-4 py-1">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">
                      {tier.price.monthly}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>
                </div>

                <ul className="mb-8 space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    className={cn(
                      'w-full',
                      tier.featured ? 'bg-primary' : 'bg-secondary'
                    )}
                  >
                    {tier.name === 'Enterprise'
                      ? 'Contact Sales'
                      : 'Get Started'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">
            Have more questions?{' '}
            <a href="#" className="text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
