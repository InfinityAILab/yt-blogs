"use client"
import markdownIt from "markdown-it"
import "react-markdown-editor-lite/lib/index.css"
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Prism as PrismSyntaxHighlighter } from "react-syntax-highlighter"
import { renderToString } from "react-dom/server"
import '../app/globals.css'

const mdParser = new markdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang) {
      try {
        const highlighted = renderToString(
          <PrismSyntaxHighlighter style={a11yDark} language={lang} PreTag="div">
            {str}
          </PrismSyntaxHighlighter>
        )
        return highlighted
      } catch (__) {}
    }
    return ""
  },
})

interface Props {
  content: string
}


const SyntaxHighlighter = ({content}: Props) => {

  return (
    <div
        className="markdown-body prose "
        dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
    />
  );
};

export default SyntaxHighlighter