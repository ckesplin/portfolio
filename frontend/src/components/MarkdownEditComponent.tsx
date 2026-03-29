import demoMarkdown from '../assets/demo_markdown.md?raw'
import Tippy from '@tippyjs/react'
import Tooltip from './Tooltip'

interface MarkdownEditComponentProps {
  value: string
  setValue: (value: string) => void
}

const MarkdownEditComponent = (props: MarkdownEditComponentProps) => {
  const { value, setValue } = props

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(value).then(() => {
      alert('Copied to clipboard!')
    })
  }

  return (
    <div className="w-[calc(50%-1rem)]">
      <div className="flex gap-3 pb-1">
        <div>Markdown Editor</div>
        <Tippy
          delay={500}
          placement="bottom-start"
          content={<Tooltip textContent="Load Demo Markdown" />}
        >
          <button
            className="bg-primary text-primary-foreground px-2 py-0 rounded-sm hover:bg-accent cursor-pointer"
            onClick={() => setValue(demoMarkdown)}
          >
            DEMO
          </button>
        </Tippy>
      </div>
      <div className="bg-background-surface h-[calc(100%-1rem)] relative">
        {value && (
          <Tippy
            delay={500}
            placement="bottom-start"
            content={<Tooltip textContent="Copy To Clipboard" />}
          >
            <i
              className="hn hn-copy absolute top-3 right-3 cursor-pointer text-foreground-muted hover:text-primary"
              onClick={() => handleCopyToClipboard()}
            />
          </Tippy>
        )}
        <textarea
          value={value}
          className="markdown-text h-full w-full resize-none font-mono border-none outline-none"
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
