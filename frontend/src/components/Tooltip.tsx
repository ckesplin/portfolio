interface TooltipProps {
  textContent: string
}

const Tooltip = (props: TooltipProps) => {
  const { textContent } = props

  return (
    <div className="border-2 border-border bg-background rounded-sm text-foreground">
      <div className="px-2">{textContent}</div>
    </div>
  )
}

export default Tooltip
