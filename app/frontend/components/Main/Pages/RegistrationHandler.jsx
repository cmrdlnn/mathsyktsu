import React from 'react'
import { connect } from 'react-redux'
import Registration from './Registration'
import UnavailablePage from './UnavailablePage'

function RegistrationHandler() {
  if (this.props.token) {
    return (
      <UnavailablePage 
        message="Данная страница Вам недоступна, так как Вы уже зарегистрированы в системе"
      />
    )
  } else {
    return (
      <Registration />
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.session.token
  }
}

export default connect(mapStateToProps)(RegistrationHandler)