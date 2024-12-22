// app/api/supabase/getSubcategories/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json(
      { errorMessage: 'category is required' },
      { status: 400 }
    );
  }

  // Mock data representing subcategories
  const mockSubcategories: { [key: string]: string[] } = {
    Music: ['Pop', 'Rock', 'Jazz'],
    Gaming: ['Action', 'Strategy', 'RPG'],
    Education: ['Science', 'Mathematics', 'History'],
    Entertainment: ['Movies', 'TV Shows', 'Comedy'],
  };

  const subcategories =
    mockSubcategories[category as keyof typeof mockSubcategories] || [];

  return NextResponse.json({ subcategories }, { status: 200 });
}
