import React, { Component } from 'react';
import { Route, /* Link, */ withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logOut } from 'modules/user';

import SidebarIssues from './Pages/SidebarIssues';
import SidebarMain from './Pages/SidebarMain';
import LoginModal from '../LoginModal';

class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { loginModalOpened: false };
  }

  openLoginModal = () => {
    this.setState({ loginModalOpened: true });
  }

  closeLoginModal = () => {
    this.setState({ loginModalOpened: false });
  }

  render() {
    return (
      <div className="sidebar-menu">
        <LoginModal
          onCloseModal={this.closeLoginModal}
          modalOpened={this.state.loginModalOpened}
        />
        { this.props.token != null ? (
          <div className="auth">
            { /* <Link to='lk'>
              <div className='reg'>
                <img src='images/article32.png'/>
                Личный кабинет
              </div>
            </Link> */ }
            <div className="log" onClick={this.props.logOut}>
              <img src="images/arrowright32.png" alt="Выйти" />
              Выйти
            </div>
          </div>
        ) : (
          <div className="auth">
            <div className="log" onClick={this.openLoginModal}>
              <img src="images/user32.png" alt="Вход" />
              Вход
            </div>
            { /* <Link to='registration'>
              <div className='reg'>
                <img src='images/linedpaperpencil32.png'/>
                Регистрация
              </div>
            </Link> */ }
          </div>
        )}
        {['/', '/editorial_board', '/distribution_and_subscription', '/address']
          .map((path, index) =>
            <Route key={index} exact path={path} component={SidebarMain} />
          )
        }
        <Route exact path="/magazine" component={SidebarIssues} />
      </div>
    )
  }
}

function mapStateToProps({ user: { token } }) {
  return { token };
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: bindActionCreators(logOut, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarMenu))