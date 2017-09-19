import React from 'react'
import SidebarMenu from '../SidebarMenu'

function Sidebar() {
  const current_year = new Date().getFullYear()

  return (
    <div className="third">
      <img className="logo" src="images/logo.png" alt="Вестник СГУ" />
      <p className="description">
        Серия 1:
        <br />
        <b>Математика.</b>
        <br />
        <b>Механика.</b>
        <br />
        <b>Информатика.</b>
      </p>
      <SidebarMenu />
      <div className="footer">
          © 2008-{ current_year }
      </div>
    </div>
  )
}

export default Sidebar