export default function markdownToHtml(markdown: string): string {
  let html: string = markdown

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  html = html.replace(/`(.+?)`/g, '<code>$1</code>')

  html = html.replace(
    /!\[(.*?)\]\(([^)]*?)\)/g,
    (_match: string, alt: string, url: string): string => {
      return `<img src="${url}" alt="${alt || ''}" />`
    }
  )

  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')

  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')

  html = html.replace(
    /(^|\r?\n)((?:\s*- .+(?:\r?\n|$))+)/g,
    (_m, prefix, block) => {
      const items = block
        .trim()
        .split(/\r?\n/)
        .map((line: string) => line.replace(/^\s*- /, '').trim())
        .filter(Boolean)
        .map((item: string) => `<li>${item}</li>`)
        .join('')
      return `${prefix}<ul>${items}</ul>`
    }
  )

  html = html.replace(
    /(^|\r?\n)((?:\d+\. .+(?:\r?\n|$))+)/g,
    (_m, prefix, block) => {
      const items = block
        .trim()
        .split(/\r?\n/)
        .map((line: string) => line.replace(/^\d+\. /, '').trim())
        .filter(Boolean)
        .map((item: string) => `<li>${item}</li>`)
        .join('')
      return `${prefix}<ol>${items}</ol>`
    }
  )

  html = html.replace(
    /(?<!<\/ul>|<\/ol>|<\/li>|<\/h1>|<\/h2>|<\/h3>)\n/g,
    '<br/>'
  )

  return html
}
