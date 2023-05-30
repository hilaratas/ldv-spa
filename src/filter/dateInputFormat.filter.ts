export function dateInputFormat(date: Date) :string {
  let yyyy = date.getFullYear()
  let mm : number | string = date.getMonth()
  let dd = date.getDate()
  mm = ++mm >= 10 ? mm : '0' + mm
  return `${yyyy}-${mm}-${dd}`
}