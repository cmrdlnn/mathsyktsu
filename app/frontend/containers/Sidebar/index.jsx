import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import upperCamelCase from 'uppercamelcase';

import routes from 'routes';

import AuthenticationManagement from './containers/AuthenticationManagement';

import pages from './pages';

class Sidebar extends Component {
  renderRoutes = () => (
    Object.keys(routes).reduce((result, path) => {
      const { subroutes } = routes[path];
      const HOC = subroutes
        ? (props) => {
          const { SidebarItems } = pages;
          return (
            <SidebarItems
              items={{ [path]: routes[path].title, ...subroutes }}
              key={path}
              {...props}
            />
          );
        }
        : pages[upperCamelCase(path.substr(1))];

      result.push(<Route component={HOC} exact key={path} path={path} />);

      if (subroutes) {
        Object.keys(subroutes).forEach((subroute) => {
          result.push(<Route component={HOC} exact key={subroute} path={subroute} />);
        });
      }

      return result;
    }, [])
  )

  render() {
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
        <div className="sidebar-menu">
          <AuthenticationManagement />
          <Switch>
            {
              this.renderRoutes()
            }
          </Switch>
        </div>
        <div className="footer">
          © 2008-{ new Date().getFullYear() }
        </div>
      </div>
    );
  }
}

export default Sidebar;
