import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login, logout } from 'modules/user';

import LoginModal from '../components/LoginModal';

class AuthenticationManagement extends Component {
  constructor(props) {
    super(props);
    this.state = { loginModalIsOpen: false };
  }

  toggle = () => {
    this.setState({ loginModalIsOpen: !this.state.loginModalIsOpen });
  }

  handleKeyPress = (key, isLogin) => {
    if (key !== 'Enter') return;
    if (isLogin) {
      this.toggle();
    } else {
      this.props.exit();
    }
  }

  render() {
    const { enter, exit, user } = this.props;

    return (
      <Fragment>
        <LoginModal
          isOpen={this.state.loginModalIsOpen}
          login={enter}
          toggle={this.toggle}
          {...user}
        />
        <div className="auth">
          { user.role ? (
            <div
              className="log"
              onClick={exit}
              onKeyPress={(event) => { this.handleKeyPress(event.key, false); }}
              role="button"
              tabIndex={0}
            >
              <img src="images/arrowright32.png" alt="Выйти" />
              Выйти
            </div>
          ) : (
            <div
              className="log"
              onClick={this.toggle}
              onKeyPress={(event) => { this.handleKeyPress(event.key, true); }}
              role="button"
              tabIndex={0}
            >
              <img src="images/user32.png" alt="Вход" />
              Вход
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

AuthenticationManagement.propTypes = {
  enter: PropTypes.func.isRequired,
  exit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    error: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return {
    enter: bindActionCreators(login, dispatch),
    exit: bindActionCreators(logout, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationManagement);
