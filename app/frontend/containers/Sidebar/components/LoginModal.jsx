import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import Alert from 'components/Alert';
import Field from 'components/Field';
import Form from 'components/Form';
import Modal from 'components/Modal';

class LoginModal extends Component {
  componentWillReceiveProps(nextProps) {
    const { role, toggle } = this.props;
    if (!role && nextProps.role) {
      toggle();
    }
  }

  handleSubmit = (credentials) => {
    this.props.login(credentials);
  }

  formHOC = props => (
    <Form onSubmit={this.handleSubmit} withoutButton {...props} />
  )

  render() {
    const { error, isOpen, toggle } = this.props;

    return (
      <Modal
        header="Вход в личный кабинет"
        isOpen={isOpen}
        toggle={toggle}
        footer={<Button color="warning" type="submit">Войти</Button>}
        wrapper={this.formHOC}
      >
        <Field
          name="email"
          placeholder="Введите E-Mail"
          required
          title="E-Mail"
          type="email"
        />
        <Field
          name="password"
          placeholder="Введите пароль"
          required
          title="Пароль"
          type="password"
        />
        <Alert message={error} />
      </Modal>
    );
  }
}

LoginModal.defaultProps = {
  error: null,
  isOpen: false,
  role: null,
};

LoginModal.propTypes = {
  error: PropTypes.string,
  isOpen: PropTypes.bool,
  login: PropTypes.func.isRequired,
  role: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};

export default LoginModal;
