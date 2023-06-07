export function dateInputFormat(date: Date) :string {
  let yyyy = date.getFullYear()
  let mm :number = date.getMonth()
  let dd :number = date.getDate()
  let mmStr = ++mm >= 10 ? mm : '0' + mm
  let ddStr = ++dd >= 10 ? dd : '0' + dd
  return `${yyyy}-${mmStr}-${ddStr}`
}