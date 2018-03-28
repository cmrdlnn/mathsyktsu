import React from 'react';
import PropTypes from 'prop-types';

import Field from 'components/Field';
import Form from 'components/Form';

const IssueUpdating = ({ onUpdate, issue }) => (
  <Form buttonText="Изменить" onSubmit={onUpdate}>
    <Field
      defaultValue={issue && issue.title}
      key={issue && issue.title}
      name="title"
      placeholder="Введите новое название экземпляра журнала..."
      required
      title="Новое название экземпляра журнала"
    />
    <Field
      defaultValue={issue && issue.english_title}
      helper="Необязательно"
      key={issue && issue.english_title}
      name="english_title"
      placeholder="Введите новое название экземпляра журнала на английском языке..."
      title="Новое название экземпляра журнала на английском языке"
    />
  </Form>
);

IssueUpdating.defaultProps = { issue: null };

IssueUpdating.propTypes = {
  issue: PropTypes.shape({
    english_title: PropTypes.string,
    title: PropTypes.string.isRequired,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default IssueUpdating;
