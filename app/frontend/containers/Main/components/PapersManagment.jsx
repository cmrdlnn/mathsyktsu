import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonsMenu from 'components/ButtonsMenu';

import PaperCreation from '../components/PaperCreation';

class PapersManagment extends Component {
  papersComponents = () => {
    const { issue, paperCreate } = this.props;

    return [{
      Component: PaperCreation,
      props: {
        issueId: issue.id,
        onCreate: paperCreate,
      },
    }];
  }

  render() {
    return (
      <ButtonsMenu
        items={this.papersComponents()}
        title="Управление статьями"
      />
    );
  }
}

PapersManagment.defaultProps = { issue: null };

PapersManagment.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  paperCreate: PropTypes.func.isRequired,
};

export default PapersManagment;
