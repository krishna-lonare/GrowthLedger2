import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Header({ openAdd }) {
  const { theme, setTheme } = useTheme()
  const loc = useLocation()
  return (
    <header className="header container">
      <div className="brand">GrowthLedger</div>
      <nav className="nav">
        <Link className="btn" to="/">Home</Link>
        <button className="btn no-glow" onClick={openAdd}>Add Task</button>
        <Link className="btn" to="/analysis">Analysis</Link>
        <Link className="btn" to="/calendar">Calendar</Link>
        <Link className="btn" to="/history">Task History</Link>
        <button
          className="btn theme-toggle"
          onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
          aria-label="Toggle theme"
        >
          <span className="theme-icon" aria-hidden>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span style={{marginLeft:8}}>{theme === 'dark' ? 'Day' : 'Night'}</span>
        </button>
      </nav>
    </header>
  )
}
