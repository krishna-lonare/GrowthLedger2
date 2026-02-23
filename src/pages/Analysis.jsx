import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function useThemeColors(){
  const root = typeof window !== 'undefined' ? getComputedStyle(document.documentElement) : null
  const text = root ? root.getPropertyValue('--text').trim() : '#0f1720'
  const muted = root ? root.getPropertyValue('--muted').trim() : '#6b7280'
  const accent = root ? root.getPropertyValue('--accent').trim() : '#6366f1'
  return { text, muted, accent }
}

export default function Analysis({ lists }){
  const labels = lists.map(l => l.title || 'Untitled')
  const totals = lists.map(l => l.tasks.length)
  const dones = lists.map(l => l.tasks.filter(t=>t.done).length)
  const { text, muted, accent } = useThemeColors()

  const barData = useMemo(()=>({
    labels,
    datasets: [
      { label: 'Completed', data: dones, backgroundColor: accent || '#60a5fa' },
      { label: 'Total', data: totals, backgroundColor:'#c7d2fe' }
    ]
  }),[labels, dones, totals, accent])

  const barOptions = useMemo(()=>({
    scales: {
      x: { ticks: { color: muted || '#6b7280' }, grid: { color: 'transparent' } },
      y: { ticks: { color: muted || '#6b7280' }, grid: { color: 'rgba(0,0,0,0.04)' } }
    },
    plugins: {
      legend: { labels: { color: text || '#0f1720' } },
      tooltip: { titleColor: text, bodyColor: text }
    }
  }),[text, muted])

  return (
    <div className="container">
      <div className="card" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <h3 style={{color:'var(--text)'}}>Completion Percentage</h3>
          {lists.length === 0 && <div style={{color:'var(--muted)'}}>No task lists yet.</div>}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {lists.map((l, idx) => {
              const pct = l.tasks.length > 0 ? Math.round((dones[idx] / totals[idx]) * 100) : 0
              const color = pct >= 80 ? 'var(--good)' : pct >= 40 ? 'var(--accent)' : 'var(--bad)'
              return (
                <div key={l.id} className="card" style={{padding:12,borderRadius:10,background:'rgba(0,0,0,0.02)'}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:6,color:'var(--text)'}}>{l.title}</div>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{flex:1,background:'rgba(0,0,0,0.04)',borderRadius:8,overflow:'hidden',height:16}}>
                      <div style={{width:`${pct}%`,height:'100%',background:color,transition:'width .3s ease'}} />
                    </div>
                    <div style={{fontSize:14,fontWeight:700,color,minWidth:40,textAlign:'right'}}>{pct}%</div>
                  </div>
                  <div style={{fontSize:11,color:'var(--muted)',marginTop:6}}>{dones[idx]}/{totals[idx]} completed</div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h3 style={{color:'var(--text)'}}>Completed vs Total</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  )
}
