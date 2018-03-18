import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import FieldGroup from '../../../../../common/FieldGroup.jsx'
import Alerted from '../../../../../common/Alerted.jsx'
import { ajaxRequestToServer } from '../../../../../api'
import SettingsRedactor from './SettingsRedactor.jsx'

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      emailValid: null,
	      emailMessage: null,
	      passwordValid: null,
	      passwordMessage: null,
	      confirmPasswordValid: null,
	      confirmPasswordMessage: null
	    }
	}

	handleEmailChange () {
		this.setState({
			emailMessage: null
		})
    if (this.email.value != '') {
      const valid = EMAIL_PATTERN.test(this.email.value)
      if (valid)
        this.setState ({ 
          emailValid: 'success'
        })
      else
        this.setState ({ 
          emailValid: 'error'
        })
    } else {
      this.setState ({ 
          emailValid: null
      })
    }
  }

  handlePasswordChange () {
  	this.setState({
			passwordMessage: null,
			passwordConfirmMessage: null
		})
    const length = this.password.value.length
    const comfirmValid = () => {
      const password = this.password.value
      const confirmPassword = this.confirmPassword.value
      if (password != '' && confirmPassword != '') {
        if (password != confirmPassword || confirmPassword.length < 6 ) {
          this.setState ({
            confirmPasswordValid: 'error'
          })
        } else {
          this.setState ({ 
            confirmPasswordValid: 'success'
          })
        }
      }
    }
    if (length > 7) {
      this.setState ({ 
        passwordValid: 'success'
      })
      comfirmValid()
    } else if (length == 0) {
      this.setState ({ 
        passwordValid: null
      })
      comfirmValid()
    } else if (length < 6) {
      this.setState ({ 
        passwordValid: 'error'
      })
      comfirmValid()
    } else {
      this.setState ({ 
        passwordValid: 'warning'
      })
      comfirmValid()
    }
  }

  handleConfirmPasswordChange () {
  	this.setState({
  		passwordMessage: null,
			passwordConfirmMessage: null
		})
    const length = this.confirmPassword.value.length
    if (length == 0) {
      this.setState ({ 
        confirmPasswordValid: null
      });
    } else if (length < 6 || this.password.value != this.confirmPassword.value) {
      this.setState ({ 
        confirmPasswordValid: 'error'
      });
    } else {
      this.setState ({ 
        confirmPasswordValid: 'success'
      });
    } 
  }

  changeEmail = () => {
  	const emailValid = this.state.emailValid
  	if (emailValid == 'success') {
  		ajaxRequestToServer('/change_email', { user: { email: this.email.value } }, 'post', 
                        { 'Authorization': 'Bearer '+this.props.token })
  		.then(response => {
  			if (response.status == 200) {
  				this.setState({
  					emailMessage: 'EMail успешно изменён',
  					emailValid: null
  				})
  				this.email.value = ''
  			} else if (response.status == 409) {
					this.setState({
  					emailMessage: 'Данный EMail уже используется',
  					emailValid: 'error'
  				})
  			} else {
  				this.setState({
  					emailMessage: 'При изменении EMail произошла ошибка',
  					emailValid: 'error'
  				})
  			}
  		})
  	} else if (emailValid == null) {
  		this.setState({
  			emailMessage: 'Вы не ввели EMail',
  			emailValid: 'error'
  		})
  	} else {
  		this.setState({
  			emailMessage: 'Неверно введён EMail'
  		})
  	}
  }

  changePassword = () => {
  	const passwordValid = this.state.passwordValid
  	const confirmPasswordValid = this.state.confirmPasswordValid
  	if (passwordValid != 'danger' && confirmPasswordValid == 'success') {
  		ajaxRequestToServer('/change_password', { user: { password: this.password.value } }, 'post', 
                        { 'Authorization': 'Bearer '+this.props.token })
  		.then(response => {
  			if (response.status == 200) {
  				this.setState({
  					passwordConfirmMessage: 'Пароль успешно изменён',
  					confirmPasswordValid: null,
  					passwordValid: null
  				})
  				this.password.value = ''
  				this.confirmPassword.value = ''
  			} else {
  				this.setState({
  					passwordMessage: 'При изменении пароля произошла ошибка',
  					passwordValid: 'error',
  					confirmPasswordValid: null
  				})
  			}
  		})
  	} else {
  		if (passwordValid == null) {
	  		this.setState({
	  			passwordMessage: 'Вы не ввели пароль',
	  			passwordValid: 'error'
	  		})
	  	} else if (passwordValid == 'error') {
	  		this.setState({
	  			passwordMessage: 'Неверно введён пароль'
	  		})
	  	}
	  	if (confirmPasswordValid == null) {
	  		this.setState({
	  			passwordConfirmMessage: 'Вы не ввели подтверждение пароля',
	  			confirmPasswordValid: 'error'
	  		})
	  	} else if (confirmPasswordValid == 'error') {
	  		this.setState({
	  			passwordConfirmMessage: 'Пароли не совпадают'
	  		})
	  	}
  	}
  }

	render() {
		return(
			<div className='lkmain'>
				{ this.props.role == 'redactor' ? <SettingsRedactor/> : null }
				<h4 className='settings-header'>Изменить EMail:</h4>
				<div className='settings-block'>
					<FieldGroup
		        label="EMail:"
		        type="email"
		        placeholder="Введите новый EMail"
		        validation={this.state.emailValid}
		        onChange={this.handleEmailChange.bind(this)}
		        inputRef={(input) => { this.email = input }}
		      />
		      { Alerted(this.state.emailMessage, 
		      					this.state.emailMessage == null, 
		      					this.state.emailValid == 'error' ? 'danger' : 'success'
		      )}
		      <Button bsStyle="warning" onClick={this.changeEmail}>
            Сменить EMail
          </Button>
        </div>
        <h4 className='settings-header'>Изменить пароль:</h4>
        <div className='settings-block'>
          <FieldGroup
            label="Пароль:"
            type="password"
            placeholder="Введите новый пароль"
            validation={this.state.passwordValid}
            onChange={this.handlePasswordChange.bind(this)}
            inputRef={(input) => { this.password = input; }}
          />
          { Alerted(this.state.passwordMessage,
          					this.state.passwordMessage == null
          )}
          <FieldGroup
            label="Повторите пароль:"
            type="password"
            placeholder="Повторите пароль"
            validation={this.state.confirmPasswordValid}
            onChange={this.handleConfirmPasswordChange.bind(this)}
            inputRef={(input) => { this.confirmPassword = input; }}
          />
          { Alerted(this.state.passwordConfirmMessage,
          					this.state.passwordConfirmMessage == null,
          					this.state.confirmPasswordValid == 'error' ? 'danger' : 'success'
          )}
          <Button bsStyle="warning" onClick={this.changePassword}>
            Сменить пароль
          </Button>
				</div>
			</div>
		)
	}
}

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function mapStateToProps(state) {
  return {
    token: state.session.token,
    role: state.session.role
  }
}

export default connect(mapStateToProps)(Settings)