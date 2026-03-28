import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/markdown-editor/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/markdown-editor/"!</div>
}
