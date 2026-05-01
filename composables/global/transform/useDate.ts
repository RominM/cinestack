export const useDate = () => {
  return {
    getPrettyDate(date: Date | string, format = 'DD/MM/YYYY', short = false): string {
      const d = typeof date === 'string' ? new Date(date) : date

      if (isNaN(d.getTime())) return '—'

      if (short) {
        return d.toLocaleDateString('fr-FR', { day: '2-digit', month: short ? 'short' : 'long', year: 'numeric' })
      }

      const pad = (n: number) => String(n).padStart(2, '0')

      const tokens: Record<string, string> = {
        DD: pad(d.getDate()),
        MM: pad(d.getMonth() + 1),
        YYYY: String(d.getFullYear()),
        YY: String(d.getFullYear()).slice(-2),
        HH: pad(d.getHours()),
        mm: pad(d.getMinutes()),
        ss: pad(d.getSeconds()),
      }

      return format.replace(/DD|MM|YYYY|YY|HH|mm|ss/g, (match) => tokens[match] ?? match)
    }
  }
}