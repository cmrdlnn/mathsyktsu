import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class Form extends Component {
  handelSubmit = (e) => {
    e.preventDefault();

    const json = Array.from(e.target.elements).reduce((result, element) => {
      if (element.name) result[element.name] = element.value;
      return result;
    }, {});

    this.props.onSubmit(json);
  }

  render() {
    const {
      buttonClassName,
      buttonText,
      children,
      withoutButton,
      ...formProps
    } = this.props;

    return (
      <form
        {...formProps}
        onSubmit={this.handelSubmit}
      >
        { children }
        { withoutButton ? null : (
          <Button
            className={buttonClassName}
            color="warning"
            type="submit"
          >
            { buttonText }
          </Button>
        )}
      </form>
    );
  }
}

Form.defaultProps = {
  buttonClassName: '',
  buttonText: null,
  withoutButton: false,
};

Form.propTypes = {
  buttonClassName: PropTypes.string,
  buttonText: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  withoutButton: PropTypes.bool,
};

export default Form;
