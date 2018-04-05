import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

const Checkbox = ({
  className,
  inline,
  name,
  style,
  title,
  ...inputProps
}) => (
  <FormGroup
    check
    className={className}
    inline={inline}
    style={{ marginBottom: '1rem', ...style }}
  >
    <Label check for={name}>
      <Input
        {...inputProps}
        id={name}
        name={name}
        type="checkbox"
      />
      {' '}
      { title }
    </Label>
  </FormGroup>
);

Checkbox.defaultProps = {
  className: '',
  inline: false,
  name: null,
  style: {},
  title: null,
};

Checkbox.propTypes = {
  className: PropTypes.string,
  inline: PropTypes.bool,
  name: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.string,
  ),
  title: PropTypes.string,
};

export default Checkbox;
