import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class Papers extends React.Component {
  componentWillMount() {
    const { issue, papersIndex } = this.props;

    if (issue) papersIndex(issue.id);
  }

  render() {
    console.log(this.props)
    const { papers: { all, fetching } } = this.props;

    if (fetching) return null;

    const { isRussian } = this.props;

    if (!all.length) {
      return (
        <p className="caption">
          {
            isRussian ? (
              'Не найдено ни одной статьи у данного экземпляра журнала'
            ) : (
              'No paper found in this issue'
            )
          }
        </p>
      );
    }

    return (
      <div>
      </div>
    );
  }
}

Papers.defaultProps = { issue: null };

Papers.propTypes = {
  isRussian: PropTypes.bool.isRequired,
  issue: PropTypes.shape({
    english_title: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  papers: PropTypes.shape({
    all: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  papersIndex: PropTypes.func.isRequired,
};

export default Papers;

