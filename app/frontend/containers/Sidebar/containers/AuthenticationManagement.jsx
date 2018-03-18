import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logOut } from 'modules/user';

import LoginModal from './LoginModal';

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
    const { exit, role } = this.props;

    return (
      <Fragment>
        { role ? null : (
          <LoginModal
            toggle={this.toggle}
            isOpen={this.state.loginModalIsOpen}
          />
        )}
        <div className="auth">
          { role ? (
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

AuthenticationManagement.defaultProps = { role: null };

AuthenticationManagement.propTypes = {
  exit: PropTypes.func.isRequired,
  role: PropTypes.string,
};

function mapStateToProps({ user: { role } }) {
  return { role };
}

function mapDispatchToProps(dispatch) {
  return { exit: bindActionCreators(logOut, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationManagement);
