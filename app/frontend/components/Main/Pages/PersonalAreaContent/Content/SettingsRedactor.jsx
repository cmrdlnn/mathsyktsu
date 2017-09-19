import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import Alerted from '../../../../../common/Alerted.jsx'
import FieldGroup from '../../../../../common/FieldGroup.jsx'
import Autosuggest, { ItemAdapter } from 'react-bootstrap-autosuggest'
import { ajaxRequestToServer } from '../../../../../api'

class UserAdapter extends ItemAdapter {
  itemIncludedByInput() {
    return true
  }
  sortItems(items) {
    return items
  }
  renderItem(item) {
    return <div>
        <div><b>{item.full_name}</b></div>
        <div>{item.email}</div>
    </div>
  }
}
UserAdapter.instance = new UserAdapter()

let lastSearch

class SettingsRedactor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			users: null,
			usersMessage: 'Введите хотя бы один символ, чтобы искать пользователей',
      usersMore: null,
      userDeleteMessage: null,
      userDeleteValid: null,
      emailMessage: null,
      emailValid: null,
      fullNameMessage: null,
      fullNameValid: null
		}
	}

	onUserChange = (value) => {
		this.setState({
			user: value,
			userDeleteMessage: null,
			userDeleteValid: null
		})
	}

	getUsers = (search, page, prev) => {
		if (search) {
			if ((search === lastSearch && !page) || typeof this.state.user == 'object') {
	      return
	    }
	    lastSearch = search
			this.setState({
				usersMessage: 'Поиск пользователей...',
	      usersMore: null
			})
			ajaxRequestToServer('/user_search', { user: { like: this.state.user } },
	                        'post', { 'Authorization': 'Bearer '+this.props.token })
			.then(response => {
				if (response.status == 200) {
					response.json().then(json => {
	          let users, usersMessage, usersMore
	          if (json.length == 0) {
	            usersMessage = 'Пользователи не найдены'
	          } else {
	            users = prev ? prev.concat(json) : json
	            if (users.length < json.length) {
	              usersMessage = 'Загрузить ещё...'
	              usersMore = () => onRepoSearch(search, page ? page + 1 : 2, users)
	            }
	          }
	          this.setState({
	            users,
	            usersMessage,
	            usersMore
	          })
	        })
				} else {
					this.setState({
	          users: null,
	          usersMessage: 'При поиске произошла ошибка: ' + response.statusText,
	          usersMore: null
	        })
				}
			})
		} else {
	    this.setState({
	      users: null,
	      usersMessage: 'Введите хотя бы один символ, чтобы искать пользователей',
	      usersMore: null
	    })
		}
	}

	deleteUser = () => {
		if (typeof this.state.user == 'object') {
			if (confirm('Вы действительно хотите удалить данного пользователя?')) {
				ajaxRequestToServer('/delete_user', { user: { email: this.state.user.email } },
			                      'delete', { 'Authorization': 'Bearer '+this.props.token })
				.then(response => {
					if (response.status == 204) {
						this.setState({
							userDeleteMessage: 'Пользователь успешно удалён',
							userDeleteValid: 'success',
							users: null,
							user: ''
						})
					} else {
						this.setState({
							userDeleteMessage: 'При удалении пользователя произошла ошибка',
							userDeleteValid: 'error'
						})
					}
				})
			}
		} else {
			this.setState({
				userDeleteMessage: 'Вы не выбрали пользователя для удаления',
				userDeleteValid: 'error'
			})
		}
	}

	handleEmailChange () {
		this.setState({
			emailMessage: null
		})
    if (this.email.value != '') {
      const valid = EMAIL_PATTERN.test(this.email.value)
      if (valid) {
        this.setState ({ 
          emailValid: 'success'
        })
      } else {
      	this.setState ({ 
          emailValid: 'error'
        })
      }
    } else {
      this.setState ({ 
          emailValid: null
      })
    }
  }

  handleFullName () {
		this.setState({
			fullNameMessage: null
		})
    if (this.fullName.value == '') {
      this.setState ({ 
        fullNameValid: null
      })
    } else if (/^[A-Za-zА-Яа-яЁё\s]+$/.test(this.fullName.value)) {
      const names = this.fullName.value.split(' ').filter( (item) => item != '' )
      if (names.length > 3 || names.length < 2) {
        this.setState ({ 
          fullNameValid: 'error'
        })
      } else {
        this.setState ({ 
          fullNameValid: 'success'
        })
      }
    } else {
      this.setState ({ 
        fullNameValid: 'error'
      })
    }
  }

  createEditorial = () => {
  	const fullNameValid = this.state.fullNameValid
  	const emailValid = this.state.emailValid
  	if (fullNameValid == 'success' && emailValid == 'success' && 
  		this.fullName.value != '' && this.email.value != '') {
  		ajaxRequestToServer('/create_editorial', { user: { email: this.email.value, full_name: this.fullName.value } },
		                      'post', { 'Authorization': 'Bearer '+this.props.token })
			.then(response => {
				if (response.status == 201) {
					this.setState({
						fullNameValid: null,
						emailValid: null,
	  				fullNameMessage: 'Член редколлегии успешно создан, на указанный EMail выслано письмо с паролем для входа в систему'
	  			})
	  			this.email.value = ''
	  			this.fullName.value = ''
				} else if (response.status == 409) {
					response.json().then(json => {
						if (json.error == 1) {
							this.setState({
								emailMessage: 'Данный Email уже используются другим пользователем',
								fullNameMessage: null,
								emailValid: 'error'
							})
						} else {
							this.setState({
								emailMessage: null,
								fullNameMessage: 'Данные ФИО уже используются другим пользователем',
								fullNameValid: 'error'
							})
						}
					})
				} else {
					this.setState({
						fullNameValid: 'error',
						emailValid: 'error',
		  			fullNameMessage: 'При создании пользователя произошла ошибка'
		  		})
				}
			})
  	} else {
  		if (fullNameValid == 'error') {
  			this.setState({
  				fullNameMessage: 'Неверно введено ФИО'
  			})
  		} else if (this.fullName.value == '') {
  			this.setState({
  				fullNameMessage: 'Вы не ввели ФИО',
  				fullNameValid: 'error'
  			})
  		}
  		if (emailValid == 'error') {
  			this.setState({
  				emailMessage: 'Неверно введён EMail'
  			})
  		} else if (this.email.value == '') {
  			this.setState({
  				emailMessage: 'Вы не ввели EMail',
  				emailValid: 'error'
  			})
  		}
  	}
  }

	render() {
		return(
			<div>
				<h4 className='settings-header'>
					Удаление пользователей из системы:
				</h4>
				<div className='settings-block'>
					<div style={{marginBottom: '1vh'}}>
						<Autosuggest
							datalist={this.state.users}
							datalistPartial
							valueIsItem
							itemAdapter={UserAdapter.instance}
							itemValuePropName="full_name"
							onChange={this.onUserChange}
							onSearch={this.getUsers}
							placeholder="Поиск по EMail или ФИО"
							searchDebounce={500}
							value={this.state.user}
							buttonAfter={<Button onClick={this.deleteUser}>Удалить</Button>}
				      datalistMessage={this.state.usersMessage}
				      onDatalistMessageSelect={this.state.usersMore}
						/>
						</div>
						{ Alerted(this.state.userDeleteMessage,
	          					this.state.userDeleteValid == null,
	          					this.state.userDeleteValid == 'error' ? 'danger' : 'success'
	          )}
				</div>
				<h4 className='settings-header'>
					Добавление членов редколлегии:
				</h4>
				<div className='settings-block'>
					<FieldGroup
            type="email"
            label="Email адрес:"
            placeholder="Введите Email"
            validation={this.state.emailValid}
            onChange={this.handleEmailChange.bind(this)}
            inputRef={(input) => { this.email = input }}
          />
          { Alerted(this.state.emailMessage, 
		      					this.state.emailMessage == null
		      )}
          <FieldGroup
            label="ФИО:"
            type="text"
            placeholder="Введите ФИО, отчество можно опустить"
            validation={this.state.fullNameValid}
            onChange={this.handleFullName.bind(this)}
            inputRef={(input) => { this.fullName = input }}
          />
          { Alerted(this.state.fullNameMessage, 
		      					this.state.fullNameMessage == null, 
		      					this.state.fullNameValid == 'error' ? 'danger' : 'success'
		      )}
          <Button bsStyle="warning" onClick={this.createEditorial}>
            Зарегистрировать
          </Button>
				</div>
			</div>
		)
	}
}

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function mapStateToProps(state) {
  return {
    token: state.session.token
  }
}

export default connect(mapStateToProps)(SettingsRedactor)