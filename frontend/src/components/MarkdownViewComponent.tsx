interface MarkdownViewComponentProps {
  html: string
}

const MarkdownViewComponent = (props: MarkdownViewComponentProps) => {
  const { html } = props

  return (
    <div className="w-[calc(50%-1rem)]">
      <div className="pb-1">Markdown Output</div>
      <div
        className="prose max-w-none bg-background-surface h-[calc(100%-1rem)] overflow-auto font-sans"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default MarkdownViewComponent
