import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createPaper, destroyPaper, updatePaper } from 'modules/magazine';

class Papers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
      header: null,
      isOpen: false,
      onConfirm: null,
    };
  }

  render() {
    if (this.props.fetching) return null;

    const { isRedactor, isRussian, issue, rubric } = this.props;
    const { body, english, header, isOpen, onConfirm, toggle } = this.state;

    return (
      <Fragment>
      </Fragment>
    );
  }
}

Papers.propTypes = {
  papers: PropTypes.array.isRequired,
  paperCreate: PropTypes.func.isRequired,
  paperDestroy: PropTypes.func.isRequired,
  paperUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ magazine: { papers } }) => ({ papers });

const mapDispatchToProps = dispatch => ({
  paperCreate: bindActionCreators(createPaper, dispatch),
  paperDestroy: bindActionCreators(destroyPaper, dispatch),
  paperUpdate: bindActionCreators(updatePaper, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Papers);

