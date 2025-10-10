export function daysLeft(dateStr) {
  const now = new Date()
  const target = new Date(dateStr)
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24))
}
export function yearDiff(year) {
  const y = new Date().getFullYear()
  return y - (Number(year)||0)
}
