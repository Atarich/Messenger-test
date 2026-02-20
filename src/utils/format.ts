export function formatTime(ts: number): string {
  const d = new Date(ts)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

export function formatMessageToHtml(raw: string): string {
  const esc = escapeHtml(raw)

  const bold = esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  const italic = bold.replace(/\*(.+?)\*/g, '<em>$1</em>')

  return italic.replace(/\r?\n/g, '<br/>')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
