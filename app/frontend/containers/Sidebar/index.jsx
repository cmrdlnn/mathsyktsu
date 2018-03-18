import React from 'react';

import AuthenticationManagement from './containers/AuthenticationManagement';
// import SidebarMenu from './components/SidebarMenu';

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
    <div className="sidebar-menu">
      <AuthenticationManagement />
      { /* <SidebarMenu /> */ }
    </div>
    <div className="footer">
      © 2008-{ new Date().getFullYear() }
    </div>
  </div>
);

export default Sidebar;
