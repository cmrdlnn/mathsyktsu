import React, { Component, Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import upperCamelCase from 'uppercamelcase';

import routes from 'routes';

import pages from './pages';

// Всю манипуляцию роутами можно осуществлять в файле `routes.js` из каталога `app/frontend`. При
// добавлении нового компонента необходимо создать файл с его именем в каталове `./pages` (имя
// роута, переведённое в camel case, должно совпадать с именем файла компонента, например:
// `/editorial_board` => `EditorialBoard`)
class Main extends Component {
  linkClass = (index, linksCount) => {
    const linkClassName = 'section';

    switch (index) {
      case 0:
        return `${linkClassName} left`;

      case linksCount - 1:
        return `${linkClassName} right`;

      default:
        return linkClassName;
    }
  }

  routeProps = (path) => {
    const variativeProps = path === '/'
      ? { component: pages.Home, exact: true }
      : { component: pages[upperCamelCase(path.substr(1))] };

    return {
      key: path,
      path,
      ...variativeProps,
    };
  }

  allRoutes = mainRoutes => (
    mainRoutes.reduce((result, path) => {
      result.push(this.routeProps(path));

      const { subroutes } = routes[path];

      if (subroutes) {
        Object.keys(subroutes).forEach((subroute) => {
          result.push(this.routeProps(subroute));
        });
      }

      return result;
    }, [])
  )

  render() {
    const mainRoutes = Object.keys(routes);

    return (
      <div className="twothird">
        <div className="fringing" />
        <div className="head">
          <p className="head-name">
            Вестник Сыктывкарского университета
          </p>
        </div>
        <div className="fringing" />
        <div className="main">
          <Fragment>
            {
              mainRoutes.map((path, index) => (
                <Link
                  className={this.linkClass(index, mainRoutes.length)}
                  href={path}
                  key={path}
                  to={path}
                >
                  { routes[path].title }
                </Link>
              ))
            }
          </Fragment>
          <div className="twothird-content">
            <Switch>
              {
                this.allRoutes(mainRoutes).map(route => (
                  <Route {...route} />
                ))
              }
            </Switch>
          </div>
          <div className="footer">
            { 'Вестник Сыктывкарского университета. Перейти на ' }
            <a href="https://syktsu.ru">syktsu.ru</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
