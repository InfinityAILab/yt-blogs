import { Separator } from "@/components/ui/separator"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { LocateIcon } from "lucide-react"
import Image from "next/image"
import React from "react"
import { fetchBlogs, Blog } from '../../../lib/blogService';

interface Props {
  blogs: Blog[];
}

export default async function page() {
  const blogs = await fetchBlogs();

  console.log('blogs ==========>', blogs)

  return (
    <section className="bg-gray-50 space-y-4 mb-4">
      <div className="h-40 bg-indigo-700 "></div>
      <div className="max-w-6xl bg-white rounded-sm mx-auto -mt-20 relative shadow-md p-4 md:p-0 ">
        <div className=" mx-auto bg-indigo-700 rounded-full absolute p-2 top-0 left-[15%] sm:left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="sm:h-28 sm:w-28 h-20 w-20 bg-white rounded-full "></div>
        </div>
        <div className="flex justify-end p-2 sm:pt-6 sm:pr-6 gap-4 sm:gap-6">
          <button className="bg-indigo-700 px-4 py-1.5 sm:py-2 rounded text-white">
            Follow
          </button>
          <div className="flex items-center justify-center hover:cursor-pointer flex-col gap-1.5 hover:bg-gray-200 rounded-full">
            <EllipsisHorizontalIcon className="w-8 h-8" />
          </div>
        </div>
        <div className="flex flex-col sm:items-center sm:justify-center max-w-4xl mx-auto gap-6">
          <h3 className="text-3xl font-extrabold mt-8 sm:mt-12 tracking-wide">
            John Doe
          </h3>
          <h5 className="sm:text-center text-lg">
            Looking to get into development? As a full-stack developer I guide
            you on this journey and give you bite sized tips every single day 👊
          </h5>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-14 md:gap-20">
            <span className="font-light">Cape Town, South Africa</span>
            <span className="font-light">Joined on Apr 20, 2020</span>
            <span className="font-light">https://daily-dev-tips.com/</span>
            <div className="flex gap-3 sm:justify-center sm:items-center">
              <span>
                <GitHubLogoIcon className="w-6 h-6" />
              </span>
              <span>
                <TwitterLogoIcon className="w-6 h-6" />
              </span>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-center flex-col mb-6 gap-1">
            <h4 className="font-light">Work</h4>
            <p>Solution Architect at Daily Dev Tips</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 mx-auto gap-5 h-80 max-w-6xl relative p-4 md:p-0">
        <div className="sm:col-span-1  ">
          <div className="p-4 bg-white shadow-md rounded-sm">
            <h4 className="font-semibold my-2">Saved Channels</h4>
            <Separator />
            <div className="flex py-4 gap-3 items-center">
              <Image
                src="/freecode.jpeg"
                alt="profile image"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span>freeCodeCamp</span>
            </div>
            <Separator />
            <div className="flex py-4 gap-3 items-center">
              <Image
                src="/vercel-logo.png"
                alt="profile image"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span>Vercel</span>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2  ">
          <div className="p-4 bg-white shadow-md rounded-sm ">
            <h4 className="font-semibold text-3xl my-4">Recent Posts</h4>
            <Separator />
            <div className="my-5">
              <h4 className="font-semibold text-xl my-2">
                How to make money with your content?
              </h4>
              <div className="flex gap-2 text-sm items-center">
                <p className="line-clamp-1 max-w-md">
                  Not sure about country support if im honest. Perhaps best
                  to...
                </p>
                <span>Jan 2, 23</span>
              </div>
            </div>
            <Separator />
            <div className="my-5">
              <h4 className="font-semibold text-xl my-2">
                How to make money with your content?
              </h4>
              <div className="flex gap-2 text-sm items-center">
                <p className="line-clamp-1 max-w-md">
                  Not sure about country support if im honest. Perhaps best
                  to...
                </p>
                <span>Jan 2, 23</span>
              </div>
            </div>
            <Separator />
            <div className="my-5">
              <h4 className="font-semibold text-xl my-2">
                How to make money with your content?
              </h4>
              <div className="flex gap-2 text-sm items-center">
                <p className="line-clamp-1 max-w-md">
                  Not sure about country support if im honest. Perhaps best
                  to...
                </p>
                <span>Jan 2, 23</span>
              </div>
            </div>
            <Separator />
            <div className="my-5">
              <h4 className="font-semibold text-xl my-2">
                How to make money with your content?
              </h4>
              <div className="flex gap-2 text-sm items-center">
                <p className="line-clamp-1 max-w-md">
                  Not sure about country support if im honest. Perhaps best
                  to...
                </p>
                <span>Jan 2, 23</span>
              </div>
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </section>
  )
}
