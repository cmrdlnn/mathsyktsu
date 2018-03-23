import React from 'react';
import PropTypes from 'prop-types';
import { Alert as ReactstrapAlert } from 'reactstrap';

const Alert = ({ message, color, ...alertProps }) => (
  <ReactstrapAlert
    {...alertProps}
    color={color}
    isOpen={!!message}
  >
    { message }
  </ReactstrapAlert>
);

Alert.defaultProps = {
  color: 'danger',
  message: null,
};

Alert.propTypes = {
  color: PropTypes.string,
  message: PropTypes.string,
};

export default Alert;
