"use client"
// components/MarkdownEditor.tsx
import dynamic from "next/dynamic"
import { useState } from "react"
import markdownIt from "markdown-it"
import "react-markdown-editor-lite/lib/index.css"
import "./../app/globals.css"

// Define the types we need
interface EditorProps {
  value: string
  style?: React.CSSProperties
  onChange: (data: { text: string; html: string }) => void
  renderHTML: (text: string) => React.ReactNode
  className?: string
}

// Use dynamic import for the editor
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
}) as React.ComponentType<EditorProps>

const mdParser = new markdownIt()

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!")

  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdown(text)
  }

  return (
    <div className="overflow-auto">
      <MdEditor
        style={{ height: "650px" }}
        value={markdown}
        onChange={handleEditorChange}
        renderHTML={(text) => (
          <div
            className="markdown-body prose"
            dangerouslySetInnerHTML={{ __html: mdParser.render(text) }}
          />
        )}
        className="border border-gray-300 rounded-lg"
      />
    </div>
  )
}
