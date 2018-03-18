import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const CustomAlert = ({ message, ...alertProps }) => (
  <Alert isOpen={!!message} {...alertProps}>
    { message }
  </Alert>
);

CustomAlert.propTypes = { message: PropTypes.string.isRequired };

export default CustomAlert;
