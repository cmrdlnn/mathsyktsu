import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Link from 'components/Link';

const Paper = ({
  autors,
  description,
  id,
  keywords,
  keywordsTitle,
  linkTitle,
  title,
}) => (
  <Fragment>
    <hr className="articles-separation-line" />
    <p>
      <b>
        { autors }
      </b>
      <i>
        { ' ' }
        { title }
      </i>
    </p>
    <p>
      { description }
    </p>
    <p>
      <b>
        { keywordsTitle }
        { ': ' }
      </b>
      { keywords }
    </p>
    <Link
      href={`/papers/${id}/download`}
      title={linkTitle}
    />
    <hr className="articles-separation-line" />
  </Fragment>
);

Paper.propTypes = {
  autors: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  keywords: PropTypes.string.isRequired,
  keywordsTitle: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Paper;
