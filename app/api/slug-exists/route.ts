import { NextRequest, NextResponse } from 'next/server';
import { isExistingSlug } from '@/lib/blogService';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const exists = await isExistingSlug(slug);
    return NextResponse.json({ exists });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
