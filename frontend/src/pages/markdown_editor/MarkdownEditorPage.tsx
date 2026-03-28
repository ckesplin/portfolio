import MarkdownEditComponent from '../../components/MarkdownEditComponent'
import MarkdownViewComponent from '../../components/MarkdownViewComponent'

const MarkdownEditorPage = () => {
  return (
    <div className="container flex justify-between align-middle mx-auto h-[calc(100%-3rem)] pt-3 pb-3">
      <MarkdownEditComponent />
      <MarkdownViewComponent />
    </div>
  )
}

export default MarkdownEditorPage
