import React, { useState } from 'react'

export default function AddTaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [items, setItems] = useState([{ id: Date.now(), text: '' }])

  function addItem() {
    setItems(s => [...s, { id: Date.now() + Math.random(), text: '' }])
  }

  function updateItem(id, val) {
    setItems(s => s.map(i => (i.id === id ? { ...i, text: val } : i)))
  }

  function removeItem(id) {
    setItems(s => s.filter(i => i.id !== id))
  }

  function submit() {
    if (!title.trim()) return
    const list = {
      id: Date.now().toString(),
      title: title.trim(),
      tasks: items.filter(i => i.text.trim()).map(i => ({ id: i.id, text: i.text.trim(), done: false })),
      createdAt: new Date().toISOString()
    }
    onCreate(list)
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal card">
        <h3>Create Task List</h3>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <input autoFocus placeholder="List title" value={title} onChange={e=>setTitle(e.target.value)} style={{flex:1,padding:8,borderRadius:8,border:'1px solid rgba(0,0,0,0.06)'}} />
        </div>
        <div style={{marginTop:12}}>
          {items.map((it, idx) => (
            <div key={it.id} style={{display:'flex',gap:8,marginBottom:8}}>
              <input placeholder={`Task ${idx+1}`} value={it.text} onChange={e=>updateItem(it.id,e.target.value)} style={{flex:1,padding:8,borderRadius:8,border:'1px solid rgba(0,0,0,0.06)'}} />
              <button className="btn delete" onClick={()=>removeItem(it.id)} aria-label={`Delete task ${idx+1}`}>Delete</button>
            </div>
          ))}
          <div style={{display:'flex',gap:8}}>
            <button className="btn" onClick={addItem}>Add task</button>
            <div style={{flex:1}} />
            <button className="btn accent" onClick={submit}>Done</button>
          </div>
        </div>
        <div style={{height:6}} />
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
