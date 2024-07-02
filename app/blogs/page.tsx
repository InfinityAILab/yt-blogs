// app/blogs/page.tsx
import Link from 'next/link';
import { fetchBlogs, Blog } from '@/lib/blogService';

const BlogsPage = async () => {
  const blogs = await fetchBlogs();

  return (
    <div>
      <h1>Blog List</h1>
      <Link href="/blogs/new">Create New Blog</Link>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.slug}`}>
                <h2>{blog.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsPage;
