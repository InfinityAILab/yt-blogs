"use client"
import React, { useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const CKEditorComponent = () => {
  const [editorData, setEditorData] = useState("")

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
          setEditorData(data)
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor)
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor)
        }}
      />
      <h2>Content:</h2>
      <div dangerouslySetInnerHTML={{ __html: editorData }} />
    </div>
  )
}

export default CKEditorComponent
