import React from 'react'
import TaskList from '../components/TaskList'

export default function Home({ lists, onToggle, onDelete }){
  return (
    <div className="container">
      <div className="card">
        <h2>Home</h2>
        <div className="task-list">
          {lists.length === 0 && <div style={{color:'var(--muted)'}}>No task lists yet — create one with Add Task.</div>}
          {lists.map(l=> <TaskList key={l.id} list={l} onToggle={onToggle} onDelete={onDelete} />)}
        </div>
      </div>
    </div>
  )
}
