import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PersonalArea from './PersonalArea'
import UnavailablePage from './UnavailablePage'

class PersonalAreaHandler extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.token) {
      return (
        <PersonalArea />
      )
    } else {
      return (
        <UnavailablePage 
          message="Данная страница Вам недоступна, так как Вы не вошли в систему"
        />
      )
    }
  }
}

PersonalAreaHandler.propTypes = {
  token: PropTypes.string
}

PersonalAreaHandler.defaultProps = {
  token: null
}

function mapStateToProps (state) {
  return {
    token: state.session.token
  }
}

export default connect(mapStateToProps)(PersonalAreaHandler)