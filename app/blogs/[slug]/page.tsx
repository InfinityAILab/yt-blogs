import {
  BookmarkIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"


import { notFound } from 'next/navigation';
import { fetchBlogBySlug, Blog } from '@/lib/blogService';
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import WaitList from "@/components/WaitList";

interface Props {
  params: { slug: string };
}


export default async function BlogPage ({ params }: Props) {
  const blog: Blog | null = await fetchBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-[1550px] sm:p-4 rounded-lg mx-auto pt-10 md:flex sm:grid-cols-6 lg:grid-cols-10 gap-2">
        {/* Hidden Sidebar  */}
        <aside className="md:sticky top-20 h-[calc(100vh-4rem)] p-4 rounded-lg sm:col-span-1 mt-20 hidden">
          <div className="flex flex-col sm:items-center md:items-end justify-center gap-12 mr-3">
            <div className="flex items-center justify-center hover:cursor-pointer flex-col gap-1.5 hover:text-red-500">
              <HeartIcon className="w-8 h-8 " />
              <span className="text-xs ">100+</span>
            </div>
            <div className="flex items-center justify-center hover:cursor-pointer flex-col gap-1.5 hover:text-orange-500">
              <ChatBubbleLeftIcon className="w-8 h-8 " />
              <span className="text-xs">47</span>
            </div>
            <div className="flex items-center justify-center hover:cursor-pointer flex-col gap-1.5 hover:text-indigo-500">
              <BookmarkIcon className="w-8 h-8" />
              <span className="text-xs">4</span>
            </div>
            <div className="flex items-center justify-center hover:cursor-pointer flex-col gap-1.5 hover:bg-gray-200 rounded-full">
              <EllipsisHorizontalIcon className="w-8 h-8" />
            </div>
          </div>
        </aside>
        <main className="py-4 px-2 md:px-12 bg-white sm:col-span-5 lg:col-span-7 rounded-lg lg:col-start-1 max-w-5xl mx-auto">
          <h2 className="text-start text-3xl sm:text-4xl my-4 sm:mt-4 sm:mb-8 font-semibold">
            My Blog Post
          </h2>
          <div>
            <div className="flex gap-2 sm:gap-4 items-center">
              <div className="bg-gray-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full"></div>
              <div>
                <h4 className="font-bold mb-0.5">{blog?.author || 'YoBlogs User'}</h4>
                {blog?.created_at && <p className="font-light text-xs sm:text-sm">
                  Posted on {new Date(blog.created_at).toDateString()} 
                  {/* • Originally published at daily-dev-tips.com */}
                </p>}
              </div>
            </div>
          </div>
          <SyntaxHighlighter content={blog.content || ''} />
        </main>
        {/* Hidden Sidebar */}
        <aside className="h-[calc(100vh-20rem)] p-4 rounded-lg col-span-2 bg-white hidden">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-end">
              <div className="bg-gray-600 w-10 h-10 rounded-full"></div>

              <h4 className="font-bold mb-0.5 tracking-wide">John Doe</h4>
            </div>
            <button className="my-4 bg-blue-700 text-white w-full py-2 rounded-sm">
              Follow
            </button>
            <p>
              Looking to get into development? As a full-stack developer I guide
              you on this journey and give you bite sized tips every single day
              👊
            </p>
            <div>
              <h4 className="font-semibold">Location</h4>
              <p>Cape Town, South Africa</p>
            </div>
            <div>
              <h4 className="font-semibold">Work</h4>
              <p>Solution Architect at Daily Dev Tips</p>
            </div>
            <div>
              <h4 className="font-semibold">Joined</h4>
              <p>20 Mar 2000</p>
            </div>
          </div>
        </aside>
      </div>
      <WaitList userId={blog.uuid || null} />
    </div>
  );
};

