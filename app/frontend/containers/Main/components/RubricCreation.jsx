import React from 'react';
import PropTypes from 'prop-types';

import Field from 'components/Field';
import Form from 'components/Form';

const RubricCreation = ({ onCreate }) => (
  <Form onSubmit={onCreate}>
    <Field
      name="title"
      placeholder="Введите название новой рубрики..."
      required
      title="Название новой рубрики"
    />
  </Form>
);

RubricCreation.propTypes = { onCreate: PropTypes.func.isRequired };

export default RubricCreation;
