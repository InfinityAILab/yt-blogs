"use client"
import { useEffect, useState } from "react"
import markdownit from "markdown-it"
import "react-markdown-editor-lite/lib/index.css"
import "./../../../../app/globals.css"

const mdParser = new markdownit()

const BlogPage = () => {
  const [text, setText] = useState("")

  useEffect(() => {
    const savedText = localStorage.getItem("markdownText")

    if (savedText) {
      setText(savedText)
    }
  }, [])

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-start text-4xl my-6 font-semibold">My Blog Post</h2>
      <div
        className="markdown-body prose "
        dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
      />
    </div>
  )
}

export default BlogPage
