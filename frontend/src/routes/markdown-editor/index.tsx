import { createFileRoute } from '@tanstack/react-router'
import MarkdownEditorPage from '../../pages/markdown_editor/MarkdownEditorPage'

export const Route = createFileRoute('/markdown-editor/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MarkdownEditorPage />
  )
}
