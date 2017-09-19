import React from 'react'
import { Route, Link } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import Jubilees from './Pages/Jubilees'
//import RegistrationHandler from './Pages/RegistrationHandler'
import Confirm from './Pages/Confirm'
//import PersonalAreaHandler from './Pages/PersonalAreaHandler'
import Magazine from './Pages/Magazine'
import Editorials from './Pages/Editorials'
import DistributionAndSubscription from './Pages/DistributionAndSubscription'
import Address from './Pages/Address'

function Main() {
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
          <Route exact path="/" component={MainPage} />
          <Route exact path="/jubilees" component={Jubilees} />
          { /* <Route exact path="/registration" component={RegistrationHandler}/> */ }
          <Route exact path="/confirm/:confirm_token" component={Confirm} />
          { /* <Route exact path="/lk" component={PersonalAreaHandler}/> */ }
          <Route exact path="/magazine" component={Magazine} />
          <Route exact path="/editorial_board" component={Editorials} />
          <Route exact path="/distribution_and_subscription" component={DistributionAndSubscription} />
          <Route exact path="/address" component={Address} />
        </div>
        <div className="footer">
          Вестник Сыктывкарского университета. Перейти на 
          <a href="https://syktsu.ru/">www.syktsu.ru</a>
        </div>
      </div>
    </div>
  )
}

export default Main