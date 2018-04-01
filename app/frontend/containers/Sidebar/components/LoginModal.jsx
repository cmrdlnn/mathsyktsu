import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import Alert from 'components/Alert';
import Field from 'components/Field';
import Form from 'components/Form';
import Modal from 'components/Modal';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInputType: 'email' };
  }

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

  handleEmailInputChange = (e) => {
    this.handleChange();
    if (e.target.value === 'redactor') {
      this.setState({ emailInputType: 'text' });
    } else if (this.state.emailInputType !== 'redactor') {
      this.setState({ emailInputType: 'email' });
    }
  }

  handleChange = () => {
    if (this.props.error) this.props.clearUserData();
  }

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
          onChange={this.handleEmailInputChange}
          placeholder="Введите E-Mail"
          required
          title="E-Mail"
          type={this.state.emailInputType}
        />
        <Field
          name="password"
          onChange={this.handleChange}
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
  clearUserData: PropTypes.func.isRequired,
  error: PropTypes.string,
  isOpen: PropTypes.bool,
  login: PropTypes.func.isRequired,
  role: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};

export default LoginModal;
