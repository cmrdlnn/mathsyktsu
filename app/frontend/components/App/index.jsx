import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkToken } from '../../modules'
import Sidebar from '../Sidebar'
import Main from '../Main'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.checkToken(this.props.token)
  }
  
  render() {
    return (
      <div className="content">
        <div className="row-padding">
          <Sidebar />
          <Main />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.session.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkToken: bindActionCreators(checkToken, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
