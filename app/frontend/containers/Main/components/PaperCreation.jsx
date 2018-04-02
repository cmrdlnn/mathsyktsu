import React from 'react';
import PropTypes from 'prop-types';

import Field from 'components/Field';
import Form from 'components/Form';

const PaperCreation = ({ onCreate, issueId }) => (
  <Form onSubmit={(data) => { onCreate(data, issueId); }}>
    <Field
      name="title"
      placeholder="Введите название новой статьи..."
      required
      title="Название новой статьи"
    />
    <Field
      helper="Необязательно"
      name="english_title"
      placeholder="Введите название новой статьи на английском языке..."
      title="Название новой статьи на английском языке"
    />
    <Field
      name="topic"
      placeholder="Введите тему новой статьи..."
      required
      title="Тема новой статьи"
    />
    <Field
      helper="Необязательно"
      name="english_topic"
      placeholder="Введите тему новой статьи на английском языке..."
      title="Тема новой статьи на английском языке"
    />
    <Field
      name="autors"
      placeholder="Введите авторов новой статьи..."
      required
      title="Авторы новой статьи"
    />
    <Field
      helper="Необязательно"
      name="english_autors"
      placeholder="Введите авторов новой статьи на английском языке..."
      title="Авторы новой статьи на английском языке"
    />
    <Field
      name="keywords"
      placeholder="Введите ключевые слова для новой статьи..."
      required
      title="Ключевые слова новой статьи"
    />
    <Field
      helper="Необязательно"
      name="english_keywords"
      placeholder="Введите ключевые слова новой статьи на английском языке..."
      title="Ключевые слова новой статьи на английском языке"
    />
    <Field
      name="description"
      placeholder="Введите описание новой статьи..."
      required
      title="Описание новой статьи"
      type="textarea"
    />
    <Field
      helper="Необязательно"
      name="english_description"
      placeholder="Введите ключевые слова новой статьи на английском языке..."
      title="Ключевые слова новой статьи на английском языке"
      type="textarea"
    />
    <Field
      name="file"
      required
      title="Файл статьи"
      type="file"
    />
  </Form>
);

PaperCreation.propTypes = {
  onCreate: PropTypes.func.isRequired,
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaperCreation;
