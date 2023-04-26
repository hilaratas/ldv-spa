export function dateTimeFilter(date: Date) {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  return Intl.DateTimeFormat('ru-Ru', options).format(date)
}