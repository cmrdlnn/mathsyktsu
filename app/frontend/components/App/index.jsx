import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkToken } from 'modules/user';
import Sidebar from '../Sidebar';
import Main from '../Main';

class App extends Component {
  componentWillMount() {
    this.props.checkToken();
  }

  render() {
    return (
      <div className="content">
        <div className="row-padding">
          <Sidebar />
          <Main />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { checkToken: bindActionCreators(checkToken, dispatch) };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
