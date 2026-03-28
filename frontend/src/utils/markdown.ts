export function convertMarkdownToHtml(text: string): string {
  // ─── FRONT MATTER ────────────────────────────────────────────────────────────
  text = text.replace(/^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]?/, '')

  // ─── NORMALIZE LINE ENDINGS ──────────────────────────────────────────────────
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // ─── MATH BLOCKS ─────────────────────────────────────────────────────────────
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-block">$1</div>')
  text = text.replace(/\$([^\n$]+?)\$/g, '<span class="math-inline">$1</span>')

  // ─── FENCED CODE BLOCKS ──────────────────────────────────────────────────────
  text = text.replace(
    /^```(\w*)\n?([\s\S]*?)```/gm,
    (_: string, lang: string, code: string): string => {
      const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return `<pre><code${lang ? ` class="language-${lang}"` : ''}>${escaped}</code></pre>`
    }
  )

  // ─── INDENTED CODE BLOCKS ────────────────────────────────────────────────────
  text = text.replace(
    /^( {4}|\t)(.+)/gm,
    (_: string, __: string, code: string): string => {
      return `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    }
  )

  // ─── SETEXT HEADINGS ─────────────────────────────────────────────────────────
  text = text.replace(/^(.+)\n={3,}\s*$/gm, '<h1>$1</h1>')
  text = text.replace(/^(.+)\n-{3,}\s*$/gm, '<h2>$1</h2>')

  // ─── ATX HEADINGS ────────────────────────────────────────────────────────────
  text = text.replace(/^###### (.+)/gm, '<h6>$1</h6>')
  text = text.replace(/^##### (.+)/gm, '<h5>$1</h5>')
  text = text.replace(/^#### (.+)/gm, '<h4>$1</h4>')
  text = text.replace(/^### (.+)/gm, '<h3>$1</h3>')
  text = text.replace(/^## (.+)/gm, '<h2>$1</h2>')
  text = text.replace(/^# (.+)/gm, '<h1>$1</h1>')

  // ─── HORIZONTAL RULES ────────────────────────────────────────────────────────
  text = text.replace(/^([-*_])\s*\1\s*\1[\s-*_]*$/gm, '<hr />')

  // ─── BLOCKQUOTES ─────────────────────────────────────────────────────────────
  text = text.replace(
    /^(>+)(.+)/gm,
    (_: string, level: string, content: string): string => {
      const depth: number = level.trim().length
      return `<blockquote data-depth="${depth}">${content.trim()}</blockquote>`
    }
  )

  // ─── TABLES ──────────────────────────────────────────────────────────────────
  text = text.replace(
    /^(\|.+\|)\n\|([-:| ]+)\|\n((?:\|.+\|\n?)*)/gm,
    (_: string, header: string, align: string, body: string): string => {
      const alignments: string[] = align
        .split('|')
        .filter(Boolean)
        .map((a: string): string => {
          a = a.trim()
          if (a.startsWith(':') && a.endsWith(':')) return 'center'
          if (a.endsWith(':')) return 'right'
          if (a.startsWith(':')) return 'left'
          return ''
        })

      const headers: string = header
        .split('|')
        .filter(Boolean)
        .map(
          (h: string, i: number): string =>
            `<th${alignments[i] ? ` style="text-align:${alignments[i]}"` : ''}>${h.trim()}</th>`
        )
        .join('')

      const rows: string = body
        .trim()
        .split('\n')
        .map((row: string): string => {
          const cells = row
            .split('|')
            .filter(Boolean)
            .map(
              (c: string, i: number): string =>
                `<td${alignments[i] ? ` style="text-align:${alignments[i]}"` : ''}>${c.trim()}</td>`
            )
            .join('')
          return `<tr>${cells}</tr>`
        })
        .join('')

      return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`
    }
  )

  // ─── TASK LISTS ──────────────────────────────────────────────────────────────
  text = text.replace(
    /^- \[x] (.+)/gm,
    '<li class="task-item"><input type="checkbox" checked disabled /> $1</li>'
  )
  text = text.replace(
    /^- \[ ] (.+)/gm,
    '<li class="task-item"><input type="checkbox" disabled /> $1</li>'
  )

  // ─── UNORDERED LISTS ─────────────────────────────────────────────────────────
  text = text.replace(
    /^(\s*)[-*+] (.+)/gm,
    (_: string, indent: string, content: string): string => {
      const depth: number = Math.floor(indent.length / 2)
      return `<li data-depth="${depth}">${content}</li>`
    }
  )
  text = text.replace(
    /(<li data-depth="\d+">.+<\/li>\n?)+/g,
    (match: string): string => `<ul>${match}</ul>`
  )

  // ─── ORDERED LISTS ───────────────────────────────────────────────────────────
  text = text.replace(
    /^(\s*)\d+\. (.+)/gm,
    (_: string, indent: string, content: string): string => {
      const depth: number = Math.floor(indent.length / 2)
      return `<ol-item data-depth="${depth}">${content}</ol-item>`
    }
  )
  text = text.replace(
    /(<ol-item[\s\S]*?<\/ol-item>\n?)+/g,
    (match: string): string => `<ol>${match.replace(/ol-item/g, 'li')}</ol>`
  )

  // ─── DEFINITION LISTS ────────────────────────────────────────────────────────
  text = text.replace(
    /^([^\n:].+)\n: (.+)/gm,
    '<dl><dt>$1</dt><dd>$2</dd></dl>'
  )

  // ─── FOOTNOTES ───────────────────────────────────────────────────────────────
  const footnotes: Record<string, string> = {}
  text = text.replace(
    /^\[\^([^\]]+)]: (.+)/gm,
    (_: string, id: string, def: string): string => {
      footnotes[id] = def
      return ''
    }
  )
  text = text.replace(
    /\[\^([^\]]+)]/g,
    (_: string, id: string): string =>
      `<sup><a href="#fn-${id}" id="fnref-${id}">[${id}]</a></sup>`
  )
  if (Object.keys(footnotes).length) {
    const fnHTML: string = Object.entries(footnotes)
      .map(
        ([id, def]: [string, string]): string =>
          `<li id="fn-${id}">${def} <a href="#fnref-${id}">↩</a></li>`
      )
      .join('')
    text += `\n<hr /><ol class="footnotes">${fnHTML}</ol>`
  }

  // ─── REFERENCE-STYLE LINKS & IMAGES ──────────────────────────────────────────
  interface Ref {
    url: string
    title?: string
  }
  const refs: Record<string, Ref> = {}
  text = text.replace(
    /^\[([^\]]+)]: (https?:\/\/\S+)(?:\s+"([^"]+)")?/gm,
    (_: string, id: string, url: string, title?: string): string => {
      refs[id.toLowerCase()] = { url, title }
      return ''
    }
  )
  text = text.replace(
    /!\[([^\]]*)]\[([^\]]*)]/g,
    (_: string, alt: string, id: string): string => {
      const r: Ref | undefined = refs[(id || alt).toLowerCase()]
      return r
        ? `<img src="${r.url}" alt="${alt}"${r.title ? ` title="${r.title}"` : ''} />`
        : _
    }
  )
  text = text.replace(
    /\[([^\]]+)]\[([^\]]*)]/g,
    (_: string, label: string, id: string): string => {
      const r: Ref | undefined = refs[(id || label).toLowerCase()]
      return r
        ? `<a href="${r.url}"${r.title ? ` title="${r.title}"` : ''}>${label}</a>`
        : _
    }
  )

  // ─── INLINE IMAGES ───────────────────────────────────────────────────────────
  text = text.replace(
    /!\[([^\]]*)]\(([^)]+?)(?:\s+"([^"]+)")?\)/g,
    (_: string, alt: string, src: string, title?: string): string =>
      `<img src="${src}" alt="${alt}"${title ? ` title="${title}"` : ''} />`
  )

  // ─── INLINE LINKS ────────────────────────────────────────────────────────────
  text = text.replace(
    /\[([^\]]+)]\(([^)]+?)(?:\s+"([^"]+)")?\)/g,
    (_: string, label: string, href: string, title?: string): string =>
      `<a href="${href}"${title ? ` title="${title}"` : ''}>${label}</a>`
  )

  // ─── AUTOLINKS ───────────────────────────────────────────────────────────────
  text = text.replace(
    /^###### (.+)/gm,
    (_: string, g1: string) => `<h6>${g1}</h6>`
  )
  text = text.replace(
    /<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>/g,
    '<a href="mailto:$1">$1</a>'
  )

  // ─── INLINE CODE ─────────────────────────────────────────────────────────────
  text = text.replace(
    /`([^`]+)`/g,
    (_: string, code: string): string =>
      `<code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`
  )

  // ─── BOLD + ITALIC ───────────────────────────────────────────────────────────
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  text = text.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')

  // ─── BOLD ─────────────────────────────────────────────────────────────────────
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>')

  // ─── ITALIC ───────────────────────────────────────────────────────────────────
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
  text = text.replace(/_(.+?)_/g, '<em>$1</em>')

  // ─── STRIKETHROUGH ────────────────────────────────────────────────────────────
  text = text.replace(/~~(.+?)~~/g, '<del>$1</del>')

  // ─── HIGHLIGHT ────────────────────────────────────────────────────────────────
  text = text.replace(/==(.+?)==/g, '<mark>$1</mark>')

  // ─── SUPERSCRIPT / SUBSCRIPT ──────────────────────────────────────────────────
  text = text.replace(/\^(.+?)\^/g, '<sup>$1</sup>')
  text = text.replace(/~(.+?)~/g, '<sub>$1</sub>')

  // ─── ABBREVIATIONS ────────────────────────────────────────────────────────────
  const abbrs: Record<string, string> = {}
  text = text.replace(
    /^\*\[(.+?)]: (.+)/gm,
    (_: string, abbr: string, def: string): string => {
      abbrs[abbr] = def
      return ''
    }
  )
  Object.entries(abbrs).forEach(([abbr, def]: [string, string]): void => {
    text = text.replace(
      new RegExp(`\\b${abbr}\\b`, 'g'),
      `<abbr title="${def}">${abbr}</abbr>`
    )
  })

  // ─── EMOJI ────────────────────────────────────────────────────────────────────
  const emojiMap: Record<string, string> = {
    ':smile:': '😄',
    ':rocket:': '🚀',
    ':warning:': '⚠️',
    ':white_check_mark:': '✅',
    ':x:': '❌',
    ':heart:': '❤️',
    ':thumbsup:': '👍',
    ':thumbsdown:': '👎',
    ':fire:': '🔥',
    ':star:': '⭐',
    ':check:': '✔️',
    ':info:': 'ℹ️',
  }
  text = text.replace(
    /:([a-z0-9_]+):/g,
    (match: string): string => emojiMap[match] ?? match
  )

  // ─── HARD LINE BREAKS ─────────────────────────────────────────────────────────
  text = text.replace(/ {2}\n/g, '<br />\n')
  text = text.replace(/\\\n/g, '<br />\n')

  // ─── ESCAPES ──────────────────────────────────────────────────────────────────
  text = text.replace(
    /\\([\\`*_{}\[\]()#+\-.!|])/g,
    (_: string, char: string): string => {
      const map: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
      }
      return map[char] ?? char
    }
  )

  // ─── PARAGRAPHS ───────────────────────────────────────────────────────────────
  text = text
    .split(/\n{2,}/)
    .map((block: string): string => {
      block = block.trim()
      if (!block) return ''
      if (
        /^<(h[1-6]|ul|ol|li|blockquote|pre|table|dl|div|hr|p)[\s>]/.test(block)
      )
        return block
      return `<p>${block.replace(/\n/g, ' ')}</p>`
    })
    .join('\n')

  return text
}
