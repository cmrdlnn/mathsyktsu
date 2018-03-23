import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authenticate } from 'modules/user';

import Main from './Main';
import Sidebar from './Sidebar';

class App extends Component {
  componentWillMount() {
    this.props.authenticate();
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

App.propsTypes = { authenticate: PropTypes.func.isRequired };

function mapDispatchToProps(dispatch) {
  return { authenticate: bindActionCreators(authenticate, dispatch) };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
