"use client"
import { useEffect, useState } from "react"
import markdownIt from "markdown-it"
import "react-markdown-editor-lite/lib/index.css"
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { renderToString } from "react-dom/server"

import "./../../../../app/globals.css"
import {
  BookmarkIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"

const mdParser = new markdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang) {
      try {
        const highlighted = renderToString(
          <SyntaxHighlighter style={a11yDark} language={lang} PreTag="div">
            {str}
          </SyntaxHighlighter>
        )
        return highlighted
      } catch (__) {}
    }
    return ""
  },
})

const BlogPage = () => {
  const [text, setText] = useState("")

  useEffect(() => {
    const savedText = localStorage.getItem("markdownText")

    if (savedText) {
      setText(savedText)
    }
  }, [])

  return (
    <div className="bg-gray-100">
      <div className="max-w-[1550px] sm:p-4 rounded-lg mx-auto pt-10 md:grid sm:grid-cols-6 lg:grid-cols-10 gap-2">
        <aside className="md:sticky top-20 h-[calc(100vh-4rem)]  p-4 rounded-lg sm:col-span-1 mt-20 hidden md:block">
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
        <main className="py-4 px-2 md:px-12 bg-white sm:col-span-5 lg:col-span-7 rounded-lg max-w-5xl">
          <h2 className="text-start text-3xl sm:text-4xl my-4 sm:mt-4 sm:mb-8 font-semibold">
            My Blog Post
          </h2>
          <div>
            <div className="flex gap-2 sm:gap-4 items-center">
              <div className="bg-gray-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full"></div>
              <div>
                <h4 className="font-bold mb-0.5">John Doe</h4>
                <p className="font-light text-xs sm:text-sm">
                  Posted on 20 Jan 2022 • Originally published at
                  daily-dev-tips.com
                </p>
              </div>
            </div>
          </div>
          <div
            className="markdown-body prose "
            dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
          />
        </main>
        <aside className="h-[calc(100vh-20rem)] p-4 rounded-lg col-span-2 bg-white hidden lg:block">
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
    </div>
  )
}

export default BlogPage
