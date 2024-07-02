// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchBlogs, createBlog } from '@/lib/blogService';

export async function GET() {
  try {
    const blogs = await fetchBlogs();
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, slug, uuid, author } = await req.json();
    await createBlog({title, content, slug, uuid, author});
    return NextResponse.json({ message: 'Blog created successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
