import React from 'react';
import SidebarMenu from '../SidebarMenu';

const Sidebar = () => (
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
      © 2008-{ new Date().getFullYear() }
    </div>
  </div>
);

export default Sidebar;