import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';

const Field = ({
  addon,
  className,
  helper,
  name,
  style,
  title,
  ...inputProps
}) => (
  <FormGroup className={className} style={style}>
    { title ? <Label for={name}>{ title }</Label> : null }
    <InputGroup>
      { !addon ? null : (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            { addon }
          </InputGroupText>
        </InputGroupAddon>
      )}
      <Input
        {...inputProps}
        id={name}
        name={name}
      />
    </InputGroup>
    { helper ? <FormText>{ helper }</FormText> : null }
  </FormGroup>
);

Field.defaultProps = {
  addon: null,
  className: '',
  helper: null,
  name: null,
  placeholder: null,
  required: false,
  style: null,
  title: null,
  type: 'text',
};

Field.propTypes = {
  addon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  className: PropTypes.string,
  helper: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.objectOf(
    PropTypes.string,
  ),
  title: PropTypes.string,
  type: PropTypes.string,
};

export default Field;
