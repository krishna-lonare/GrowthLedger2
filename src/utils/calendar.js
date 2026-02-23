import dayjs from 'dayjs'

export function daysInMonth(year, month) {
  const start = dayjs(new Date(year, month, 1))
  const days = start.daysInMonth()
  const arr = []
  for (let d = 1; d <= days; d++) arr.push(start.date(d))
  return arr
}

export function dateKey(dt){
  return dayjs(dt).format('YYYY-MM-DD')
}
