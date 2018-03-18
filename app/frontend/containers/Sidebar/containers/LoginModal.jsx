import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import Alert from 'components/Alert';
import Field from 'components/Field';
import Form from 'components/Form';
import Modal from 'components/Modal';

const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class LoginModal extends Component {
  render() {
    const { isOpen, toggle } = this.props;

    return (
      <Modal
        header="Вход в личный кабинет"
        isOpen={isOpen}
        toggle={toggle}
        footer={<Button color="warning" type="submit">Войти</Button>}
        wrapper={({ ...props }) => <Form withoutButton {...props} />}
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
      </Modal>
    );
  }
}

export default LoginModal;
