// app/api/supabase/getCategories/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Mock data representing categories
  const mockCategories = [
    { name: 'Music', thumbnail: '/images/categories/music.png' },
    { name: 'Gaming', thumbnail: '/images/categories/gaming.png' },
    { name: 'Education', thumbnail: '/images/categories/education.png' },
    {
      name: 'Entertainment',
      thumbnail: '/images/categories/entertainment.png',
    },
  ];

  return NextResponse.json({ categories: mockCategories }, { status: 200 });
}
