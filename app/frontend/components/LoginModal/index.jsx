import React, { Component } from 'react'
import { Checkbox, Button, Modal } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FieldGroup from '../../common/FieldGroup'
import Alerted from '../../common/Alerted'
import { sessionStart, closeLoginModal } from 'modules/user';

class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      passwordValid: true,
      emailValid: true,
      emailMessage: '',
      passwordMessage: '',
      remember: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session.status == null) {
      this.setState ({
        emailMessage: '',
        emailValid: true,
        passwordValid: true,
        passwordMessage: ''
      })
    }
    else if (nextProps.session.status == 404) {
      this.setState ({
        emailMessage: 'Пользователь с данным EMail не зарегистрирован',
        emailValid: false,
        passwordValid: true,
        passwordMessage: ''
      })
    } else if (nextProps.session.status == 403) {
      this.setState ({
        emailMessage: '',
        emailValid: true,
        passwordValid: false,
        passwordMessage: 'Неверный пароль'
      })
    } else if (nextProps.session.status == 401) {
      this.setState ({
        emailMessage: 'Вы не подтвердили свой аккаунт',
        emailValid: false,
        passwordValid: true,
        passwordMessage: ''
      })
    } else if (nextProps.session.status == 202) {
      this.setState ({
        emailMessage: '',
        emailValid: true,
        passwordValid: true,
        passwordMessage: ''
      })
      this.onCloseModal()
    }
  }

  onCloseModal = () => {
    this.setState ({
      email: null,
      password: null
    })
    this.props.closeLoginModal()
    this.props.onCloseModal()
  }

  signIn = (e) => {
    e.preventDefault()
    const data = {
      user: {
        email: this.email.value,
        password: this.password.value
      }
    }
    this.props.sessionStart(data, this.state.remember)
  }

  handleEmailChange = () => {
    if (this.email.value != '') {
      const valid = EMAIL_PATTERN.test(this.email.value)
      if (valid)
        this.setState ({
          email: 'success'
        })
      else
        this.setState ({
          email: 'error'
        })
    } else {
      this.setState ({
        email: null
      })
    }
  }

  handlePasswordChange = () => {
    const length = this.password.value.length

    if (length > 5) {
      this.setState ({
        password: 'success'
      })
    } else if (length == 0) {
      this.setState ({
        password: null
      })
    } else if (length < 6) {
      this.setState ({
        password: 'error'
      })
    }
  }

  remember = () => {
    this.setState({ remember: !this.state.remember })
  }

  render() {
    return (
      <div>
        <Modal show={this.props.modalOpened} onHide={this.onCloseModal}>
          <Modal.Header className="login-modal-wrap" closeButton>
            <Modal.Title>Вход в личный кабинет</Modal.Title>
          </Modal.Header>
          <Modal.Body className="login-modal">
            <form onSubmit={this.signIn}>
              <FieldGroup
                type="email"
                label="Email адрес:"
                placeholder="Введите Email"
                validation={this.state.email}
                onChange={this.handleEmailChange}
                inputRef={(input) => this.email = input}
              />
              { Alerted(this.state.emailMessage, this.state.emailValid) }
              <FieldGroup
                label="Пароль:"
                type="password"
                placeholder="Введите пароль"
                validation={this.state.password}
                onChange={this.handlePasswordChange}
                inputRef={(input) => this.password = input}
              />
              { Alerted(this.state.passwordMessage, this.state.passwordValid) }
              <Checkbox className='login-modal-checkbox' onChange={this.remember}>
                Не запоминать
              </Checkbox>
              <Button type='submit' bsStyle="warning">
                Войти
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer className='login-modal-wrap'>
            <Button bsStyle="warning" onClick={this.onCloseModal}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

function mapStateToProps({ user }) {
  return { user };
}


function mapDispatchToProps(dispatch) {
  return {
    sessionStart: bindActionCreators(sessionStart, dispatch),
    closeLoginModal: bindActionCreators(closeLoginModal, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
