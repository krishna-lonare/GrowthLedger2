import React from 'react'

export default function TaskList({ list, onToggle, onDelete }) {
  const total = list.tasks.length
  const done = list.tasks.filter(t=>t.done).length
  return (
    <div className="task-card card">
      <div className="task-head">
        <div>
          <div style={{fontWeight:700}}>{list.title}</div>
          <div style={{fontSize:12,color:'var(--muted)'}}>{done}/{total} done</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>onDelete(list.id)}>Delete</button>
        </div>
      </div>
      <div className="task-items">
        {list.tasks.map(task=> (
          <label className="task-item" key={task.id}>
            <input type="checkbox" checked={task.done} onChange={()=>onToggle(list.id, task.id)} />
            <div style={{opacity: task.done?0.6:1}}>{task.text}</div>
          </label>
        ))}
      </div>
    </div>
  )
}
