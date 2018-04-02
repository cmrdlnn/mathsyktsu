import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { createPaper, destroyPaper, updatePaper } from 'modules/magazine';

class Papers extends React.Component {
  componentWillMount() {
    const { issue: { id }, papersIndex } = this.props;

    papersIndex(id);
  }

  render() {
    if (this.props.papers.fetching) return null;

    const { isRedactor, isRussian, issue, rubric } = this.props;

    return (
      <div>
      </div>
    );
  }
}

Papers.propTypes = {
  papers: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    all: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
  }).isRequired,
  paperCreate: PropTypes.func.isRequired,
  paperDestroy: PropTypes.func.isRequired,
  paperUpdate: PropTypes.func.isRequired,
};

export default Papers;

