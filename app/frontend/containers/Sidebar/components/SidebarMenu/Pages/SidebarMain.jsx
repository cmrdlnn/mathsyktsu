import React from 'react'
import { Link } from 'react-router-dom'

function SidebarMain() {
  return (
    <div>
      <Link to="/" href="/">
        <div className="sidebar-section">Слово главного редактора</div>
      </Link>
      <Link to="/editorial_board" href="/editorial_board">
        <div className="sidebar-section">Редколлегия</div>
      </Link>
      <Link to="/distribution_and_subscription" href="/distribution_and_subscription">
        <div className="sidebar-section">Распространение и подписка</div>
      </Link>
      <Link to="/address" href="/address">
        <div className="sidebar-section">Адрес редакции</div>
      </Link>
    </div>
  )
}

export default SidebarMain