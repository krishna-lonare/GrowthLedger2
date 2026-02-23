import React from 'react'

export default function History({ archives, onRestore, onDelete }){
  return (
    <div className="container">
      <div className="card">
        <h2>Task History</h2>
        {archives.length === 0 && <div style={{color:'var(--muted)'}}>No archived lists yet.</div>}
        <div style={{display:'grid',gap:10,marginTop:12}}>
          {archives.map(a=> (
            <div key={a.id} className="task-card card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700}}>{a.title}</div>
                  <div style={{fontSize:12,color:'var(--muted)'}}>{a.tasks.length} tasks</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn" onClick={()=>onRestore(a.id)}>Restore</button>
                  <button className="btn delete" onClick={()=>onDelete && onDelete(a.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
