import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import FieldGroup from '../../../common/FieldGroup'
import Alerted from '../../../common/Alerted'
import { ajaxRequestToServer } from '../../../api'

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      confirmPassword: null,
      fullName: null,
      fullNameValid: true,
      emailValid: true,
      signUp: false
    }
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

    const comfirmValid = () => {
      const password = this.password.value
      const confirmPassword = this.confirmPassword.value
      if (password != '' && confirmPassword != '') {
        if (password != confirmPassword || confirmPassword.length < 6 ) {
          this.setState ({
            confirmPassword: 'error'
          })
        } else {
          this.setState ({ 
            confirmPassword: 'success'
          })
        }
      }
    }

    if (length > 7) {
      this.setState ({ 
        password: 'success'
      })
      comfirmValid()
    } else if (length == 0) {
      this.setState ({ 
        password: null
      })
      comfirmValid()
    } else if (length < 6) {
      this.setState ({ 
        password: 'error'
      })
      comfirmValid()
    } else {
      this.setState ({ 
        password: 'warning'
      })
      comfirmValid()
    }
  }

  handleConfirmPasswordChange = () => {
    const length = this.confirmPassword.value.length
    if (length == 0) {
      this.setState ({ 
        confirmPassword: null
      })
    } else if (length < 6 || this.password.value != this.confirmPassword.value) {
      this.setState ({ 
        confirmPassword: 'error'
      })
    } else {
      this.setState ({ 
        confirmPassword: 'success'
      })
    } 
  }

  handleFullName = () => {
    if (this.fullName.value == 0) {
      this.setState ({ 
        fullName: null
      })
    } else if (/^[A-Za-zА-Яа-яЁё\s]+$/.test(this.fullName.value)) {
      const names = this.fullName.value.split(' ').filter( (item) => item != '' )
      if (names.length > 3 || names.length < 2) {
        this.setState ({ 
          fullName: 'error'
        })
      } else {
        this.setState ({ 
          fullName: 'success'
        })
      }
    } else {
      this.setState ({ 
        fullName: 'error'
      })
    }
  }

  signUpUser = () => {
    const emailValid = EMAIL_PATTERN.test(this.email.value)
    const fullNameValid = /^[A-Za-zА-Яа-яЁё\s]+$/.test(this.fullName.value)
    const names = this.fullName.value.split(' ').filter( (item) => item != '' )
    const length = this.password.value.length
    if (emailValid && fullNameValid && 
       (names.length <= 3 && names.length >= 2) && 
       length > 5 && this.password.value == this.confirmPassword.value) {
      const data = {
        user: {
          email: this.email.value.trim(),
          password: this.password.value,
          full_name: this.fullName.value.trim()
        }
      }
      ajaxRequestToServer('/signup', data, 'post').then(response => {
        if (response.status == 201) {
          this.setState({
            signUp: true,
            email: null,
            password: null,
            confirmPassword: null,
            fullName: null,
            fullNameValid: true,
            emailValid: true,
          })
        } else {
          response.json().then(json => {
            if (json == 3) {
              this.setState({
                fullNameValid: false,
                emailValid: false,
                email: 'error',
                fullName: 'error'
              })
            } else if (json == 2) {
              this.setState({
                fullNameValid: false,
                emailValid: true,
                fullName: 'error'
              })
            } else if (json == 1) {
              this.setState({
                fullNameValid: true,
                emailValid: false,
                email: 'error'
              })
            } else {
              this.setState({
                fullNameValid: true,
                emailValid: true
              })
              alert('Произошла неизвестная ошибка при регистрации пользователя')
            }
          })
        }}
      )
    } else {
      alert('Вы неверно заполнили форму регистрации')
    }
  }

  render() {
    return (
      <div className="main-content">
        <p className="caption">
          Регистрация
        </p>
        <div className="main-description">
          { this.state.signUp ? (
            <h2 style={{textAlign: 'center'}}>Вы успешно зарегистрированы, теперь необходимо подтвердить Ваш EMail</h2>
          ) : (
            <form>
              <FieldGroup
                type="email"
                label="Email адрес:"
                placeholder="Введите Email"
                validation={this.state.email}
                onChange={this.handleEmailChange}
                inputRef={(input) => this.email = input}
              />
              { Alerted('К сожалению данный EMail уже занят, используйте другой', this.state.emailValid) }
              <FieldGroup
                label="Пароль:"
                type="password"
                placeholder="Введите пароль"
                validation={this.state.password}
                onChange={this.handlePasswordChange}
                inputRef={(input) => this.password = input}
              />
              <FieldGroup
                label="Повторите пароль:"
                type="password"
                placeholder="Повторите пароль"
                validation={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordChange}
                inputRef={(input) => this.confirmPassword = input}
              />
              <FieldGroup
                label="ФИО:"
                type="text"
                placeholder="Введите ФИО, отчество можно опустить"
                validation={this.state.fullName}
                onChange={this.handleFullName}
                inputRef={(input) => this.fullName = input}
              />
              { Alerted('Пользователь с такими ФИО уже зарегистрирован', this.state.fullNameValid) }
              <Button bsStyle="warning" onClick={this.signUpUser}>
                Зарегистрироваться
              </Button>
            </form>
          )}
        </div>
      </div>
    )
  }
}

const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export default Registration