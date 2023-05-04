export function dateFilter(date: Date) {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }

  return Intl.DateTimeFormat('ru-Ru', options).format(date)
}