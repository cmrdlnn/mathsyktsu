import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import routes from 'routes';

import

class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { loginModalIsOpened: false };
  }

  openLoginModal = () => {
    this.setState({ loginModalIsOpened: true });
  }

  closeLoginModal = () => {
    this.setState({ loginModalIsOpened: false });
  }

  render() {
    return (
      <Fragment>
        {['/', '/editorial_board', '/distribution_and_subscription', '/address']
          .map((path, index) =>
            <Route key={index} exact path={path} component={SidebarMain} />
          )
        }
        <Route exact path="/magazine" component={SidebarIssues} />
      </Fragment>
    )
  }
}

function mapStateToProps({ user: { role } }) {
  return { role };
}

function mapDispatchToProps(dispatch) {
  return { logOut: bindActionCreators(logOut, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarMenu));
