import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ path, title, ...props }) => (
  <div className="download-link" {...props}>
    <a href={path} target="_blank">
      { title }
    </a>
  </div>
);

Link.defaultProps = { title: null };

Link.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Link;
