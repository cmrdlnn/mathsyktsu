import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ href, title, ...props }) => (
  <div className="download-link" {...props}>
    <a href={href} target="_blank">
      { title }
    </a>
  </div>
);

Link.defaultProps = { title: null };

Link.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Link;
