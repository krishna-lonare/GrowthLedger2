import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Analysis from './pages/Analysis'
import CalendarView from './pages/CalendarView'
import History from './pages/History'
import AddTaskModal from './components/AddTaskModal'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App(){
  const [lists, setLists] = useLocalStorage('gl_lists', [])
  const [archives, setArchives] = useLocalStorage('gl_archives', [])
  const [showAdd, setShowAdd] = useState(false)
  const nav = useNavigate()

  function createList(list){
    setLists(s => [list, ...s])
    nav('/')
  }

  function toggleTask(listId, taskId){
    setLists(s => s.map(l => {
      if (l.id !== listId) return l
      const tasks = l.tasks.map(t => t.id === taskId ? {...t, done: !t.done} : t)
      return {...l, tasks}
    }))
  }

  function deleteList(id){
    setLists(s => s.filter(l=> l.id!==id))
    const toArchive = lists.find(l=>l.id===id)
    if (toArchive) setArchives(a=> [toArchive, ...a])
  }

  function restoreList(id){
    const item = archives.find(a=>a.id===id)
    if (!item) return
    setArchives(a => a.filter(x=>x.id!==id))
    setLists(s => [item, ...s])
  }

  function deleteArchive(id){
    setArchives(a => a.filter(x => x.id !== id))
  }

  return (
    <div className="app">
      <Header openAdd={() => setShowAdd(true)} />
      <main style={{flex:1}}>
        <Routes>
          <Route path="/" element={<Home lists={lists} onToggle={toggleTask} onDelete={deleteList} />} />
          <Route path="/analysis" element={<Analysis lists={lists} />} />
          <Route path="/calendar" element={<CalendarView lists={lists} />} />
          <Route path="/history" element={<History archives={archives} onRestore={restoreList} onDelete={deleteArchive} />} />
        </Routes>
      </main>
      {showAdd && <AddTaskModal onClose={()=>setShowAdd(false)} onCreate={createList} />}
    </div>
  )
}
