import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkAuthentication } from 'modules/user';

import Main from './Main';
import Sidebar from './Sidebar';

class App extends Component {
  // componentWillMount() {
  //   this.props.checkAuthentication();
  // }

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

App.propsTypes = { checkAuthentication: PropTypes.func.isRequired };

function mapDispatchToProps(dispatch) {
  return { checkAuthentication: bindActionCreators(checkAuthentication, dispatch) };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
