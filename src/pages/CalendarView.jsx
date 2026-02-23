import React, { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { daysInMonth, dateKey } from '../utils/calendar'

function MonthGrid({ currentMonth, dailyStats }){
  const year = currentMonth.year()
  const month = currentMonth.month()
  const days = daysInMonth(year, month)
  const firstWeekday = dayjs(new Date(year, month, 1)).day()
  const blanks = Array.from({length:firstWeekday})

  return (
    <div style={{marginBottom:18}}>
      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=> <div key={d} style={{fontSize:12,color:'var(--muted)'}}>{d}</div>)}
        {blanks.map((_,i)=>(<div key={`b${i}`} />))}
        {days.map(d=>{
          const key = dateKey(d)
          const stat = dailyStats[key] || 0
          const today = dayjs().isSame(d,'day')
          const color = stat >= 80 ? 'var(--good)' : stat >= 40 ? 'var(--accent)' : 'var(--bad)'
          return (
            <div key={key} className="day-box card" style={{borderColor: today? 'var(--accent)': undefined}}>
              <div className="day-num">{d.date()}</div>
              <div style={{textAlign:'center'}}>
                <div className="growth-badge" style={{background:color,color:'#fff'}}>{stat}%</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function CalendarView({ lists }){
  // build daily stats by createdAt date
  const daily = {}
  lists.forEach(list => {
    // use list.createdAt for grouping; if missing, use today's date
    const createdDate = list.createdAt || new Date().toISOString()
    const key = dayjs(createdDate).format('YYYY-MM-DD')
    // accumulate totals and dones by list-level created date
    daily[key] = daily[key] || { total:0, done:0 }
    list.tasks.forEach(t => {
      daily[key].total += 1
      if (t.done) daily[key].done += 1
    })
  })
  const dailyPct = {}
  Object.keys(daily).forEach(k=> dailyPct[k] = Math.round((daily[k].done/daily[k].total)*100 || 0))

  const [viewMonth, setViewMonth] = useState(() => dayjs())

  const currentMonthTitle = useMemo(() => viewMonth.format('MMMM YYYY'), [viewMonth])

  function prevMonth(){ setViewMonth(m => m.subtract(1, 'month')) }
  function nextMonth(){ setViewMonth(m => m.add(1, 'month')) }

  return (
    <div className="container">
      <div className="card">
        <div className="calendar-header">
          <div className="month-title">{currentMonthTitle}</div>
          <div className="month-controls">
            <button className="btn" onClick={prevMonth}>‹ Prev</button>
            <button className="btn" onClick={() => setViewMonth(dayjs())}>Today</button>
            <button className="btn accent" onClick={nextMonth}>Next ›</button>
          </div>
        </div>
        <MonthGrid currentMonth={viewMonth} dailyStats={dailyPct} />
      </div>
    </div>
  )
}
