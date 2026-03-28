interface MarkdownEditComponentProps {
  setValue: (value: string) => void
}

const MarkdownEditComponent = (props: MarkdownEditComponentProps) => {
  const { setValue } = props

  return (
    <div className="w-[calc(50%-1rem)]">
      <div>Markdown Editor</div>
      <div className="bg-background-surface h-[calc(100%-1rem)]">
        <textarea
          className="markdown-text h-full w-full resize-none font-mono"
          onChange={(e) => setValue(e.target.value)}
        />
        <pre aria-hidden="true">
          <code className="markdown-text" />
        </pre>
      </div>
    </div>
  )
}

export default MarkdownEditComponent
