import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Link from 'components/Link';

const Issue = ({ children, isRedactor, isRussian, issue, rubric }) => {
  if (!issue) {
    return (
      <p className="caption">
        {
          isRussian ? (
            'Не найдено ни одного выпуска журнала в данной рубрике'
          ) : (
            'No issues found in this rubric'
          )
        }
      </p>
    );
  }

  return (
    <Fragment>
      <Link
        path={`/issues/${issue.id}/download`}
        title={isRussian ? 'Скачать полный текст' : 'Download this issue'}
      />
      <div className="main-description">
        <p className="caption">
          { isRussian ? issue.title : issue.english_title || issue.title }
        </p>
        { children }
      </div>
    </Fragment>
  );
};

Issue.defaultProps = { issue: null };

Issue.propTypes = {
  isRedactor: PropTypes.bool.isRequired,
  isRussian: PropTypes.bool.isRequired,
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  rubric: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Issue;
