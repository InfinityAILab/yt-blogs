"use client"
// components/MarkdownEditor.tsx
import dynamic from "next/dynamic"
import { useState } from "react"
import markdownIt from "markdown-it"
import "react-markdown-editor-lite/lib/index.css"
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { renderToString } from "react-dom/server"
import { Label } from "./ui/label"

// import "./../app/globals.css"

interface EditorProps {
  value: string
  style?: React.CSSProperties
  onChange: (data: { content: string; html: string }) => void
  renderHTML: (content: string) => React.ReactNode
  className?: string
}

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
}) as React.ComponentType<EditorProps>

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

export default function MarkdownEditor({ content, setContent }: any) {
  const handleEditorChange = ({ content }: { content: string }) => {
    setContent(content)
  }

  return (
    <div className="overflow-auto h-full">
      <MdEditor
        value={content}
        onChange={(content) => handleEditorChange(content)}
        renderHTML={(content) => (
          <div
          className="markdown-body prose"
          dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
          />
        )}
        className="border border-gray-300 rounded-lg h-full overflow-hidden"
      />
    </div>
  )
}
