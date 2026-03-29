import MarkdownEditComponent from '../../components/MarkdownEditComponent'
import MarkdownViewComponent from '../../components/MarkdownViewComponent'
import { useState } from 'react'
import { convertMarkdownToHtml } from '../../utils/markdown'

const MarkdownEditorPage = () => {
  const [markdownText, setMarkdownText] = useState('')

  return (
    <div className="container flex justify-between align-middle mx-auto h-[calc(100%-3rem)] pt-3 pb-3">
      <MarkdownEditComponent value={markdownText} setValue={setMarkdownText}/>
      <MarkdownViewComponent html={convertMarkdownToHtml(markdownText)}/>
    </div>
  )
}

export default MarkdownEditorPage
