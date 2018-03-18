import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
// import MainPage from './Pages/MainPage';
// import Jubilees from './Pages/Jubilees';
// import Confirm from './Pages/Confirm';
// import Magazine from './Pages/Magazine';
// import Editorials from './Pages/Editorials';
// import DistributionAndSubscription from './Pages/DistributionAndSubscription';
// import Address from './Pages/Address';

const Main = () => (
  <div className="twothird">
    <div className="fringing" />
    <div className="head">
      <p className="head-name">
        Вестник Сыктывкарского университета
      </p>
    </div>
    <div className="fringing" />
    <div className="main">
      <div>
        <Link to="/" href="/" className="section left">
          О журнале
        </Link>
        <Link to="/jubilees" href="/jubilees" className="section">
          Юбиляры
        </Link>
        <Link to="/news" href="/news" className="section">
          Новости
        </Link>
        <Link to="/to_autors" href="/to_autors" className="section">
          Авторам
        </Link>
        <Link to="/magazine" href="/magazine" className="section right">
          Вестник
        </Link>
      </div>
      <div className="twothird-content">
        <Switch>
          <Route path="/" />
          <Route path="/jubilees" />
          <Route path="/confirm/:confirm_token" />
          <Route path="/magazine" />
          <Route path="/editorial_board" />
          <Route path="/distribution_and_subscription" />
          <Route path="/address" />
        </Switch>
      </div>
      <div className="footer">
        Вестник Сыктывкарского университета. Перейти на
        <a href="https://syktsu.ru/"> www.syktsu.ru</a>
      </div>
    </div>
  </div>
);

export default Main;
