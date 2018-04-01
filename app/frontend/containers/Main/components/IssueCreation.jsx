import React from 'react';
import PropTypes from 'prop-types';

import Field from 'components/Field';
import Form from 'components/Form';

const IssueCreation = ({ onCreate, rubric }) => (
  <Form onSubmit={(data) => { onCreate(data, rubric); }}>
    <Field
      name="title"
      placeholder="Введите название нового экземпляра журнала..."
      required
      title="Название нового экземпляра журнала"
    />
    <Field
      helper="Необязательно"
      name="english_title"
      placeholder="Введите название нового экземпляра журнала на английском языке..."
      title="Название нового экземпляра журнала на английском языке"
    />
    <Field
      helper="Необязательно"
      name="file"
      title="Файл экземпляра журнала"
      type="file"
    />
  </Form>
);

IssueCreation.propTypes = {
  onCreate: PropTypes.func.isRequired,
  rubric: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default IssueCreation;
