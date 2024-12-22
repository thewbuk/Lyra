'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Category = {
  id: number;
  name: string;
  description: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const supabaseClient = supabase();
        const { data, error } = await supabaseClient
          .from('categories')
          .select('*')
          .order('name');

        if (error) {
          console.error('Error fetching categories:', error);
          return;
        }

        setCategories(data || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const SkeletonCard = () => (
    <Card className="h-[140px]">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mt-2" />
      </CardHeader>
    </Card>
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // Show 6 skeleton cards while loading
            [...Array(6)].map((_, index) => (
              <div key={index} className="transition-transform hover:scale-105">
                <SkeletonCard />
              </div>
            ))
          : categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.name.toLowerCase()}`}
                className="transition-transform hover:scale-105"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  );
}
