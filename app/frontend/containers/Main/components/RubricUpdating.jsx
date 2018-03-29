import React from 'react';
import PropTypes from 'prop-types';

import Field from 'components/Field';
import Form from 'components/Form';

const RubricUpdating = ({ onUpdate, rubric }) => (
  <Form buttonText="Изменить" onSubmit={(data) => { onUpdate(rubric.id, data); }}>
    <Field
      defaultValue={rubric && rubric.title}
      key={rubric && rubric.title}
      name="title"
      placeholder="Введите новое название рубрики..."
      required
      title="Новое название рубрики"
    />
  </Form>
);

RubricUpdating.defaultProps = { rubric: null };

RubricUpdating.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  rubric: PropTypes.shape({ title: PropTypes.string.isRequired }),
};

export default RubricUpdating;
