import React from 'react';
import PropTypes from 'prop-types';

import Field from 'components/Field';
import Form from 'components/Form';

const PaperCreation = ({
  buttonText,
  extension,
  hints: {
    file,
    autors,
    description,
    english_autors,
    english_description,
    english_keywords,
    english_title,
    english_topic,
    keywords,
    title,
    topic,
  },
  onSubmit,
}) => (
  <Form buttonText={buttonText} onSubmit={onSubmit}>
    <Field
      defaultValue={title.defaultValue}
      key={`${title.defaultValue}-title`}
      name="title"
      placeholder={title.placeholder}
      required
      title={title.title}
    />
    <Field
      defaultValue={english_title.defaultValue}
      helper="Необязательно"
      key={`${english_title.defaultValue}-english_title`}
      name="english_title"
      placeholder={english_title.placeholder}
      title={english_title.title}
    />
    <Field
      defaultValue={topic.defaultValue}
      key={`${topic.defaultValue}-topic`}
      name="topic"
      placeholder={topic.placeholder}
      required
      title={topic.title}
    />
    <Field
      defaultValue={english_topic.defaultValue}
      helper="Необязательно"
      key={`${english_topic.defaultValue}-english_topic`}
      name="english_topic"
      placeholder={english_topic.placeholder}
      title={english_topic.title}
    />
    <Field
      defaultValue={autors.defaultValue}
      key={`${autors.defaultValue}-autors`}
      name="autors"
      placeholder={autors.placeholder}
      required
      title={autors.title}
    />
    <Field
      defaultValue={english_autors.defaultValue}
      helper="Необязательно"
      key={`${english_autors.defaultValue}-english_autors`}
      name="english_autors"
      placeholder={english_autors.placeholder}
      title={english_autors.title}
    />
    <Field
      defaultValue={keywords.defaultValue}
      key={`${keywords.defaultValue}-keywords`}
      name="keywords"
      placeholder={keywords.placeholder}
      required
      title={keywords.title}
    />
    <Field
      defaultValue={english_keywords.defaultValue}
      helper="Необязательно"
      key={`${english_keywords.defaultValue}-english_keywords`}
      name="english_keywords"
      placeholder={english_keywords.placeholder}
      title={english_keywords.title}
    />
    <Field
      defaultValue={description.defaultValue}
      key={`${description.defaultValue}-description`}
      name="description"
      placeholder={description.placeholder}
      required
      title={description.title}
      type="textarea"
    />
    <Field
      defaultValue={english_description.defaultValue}
      helper="Необязательно"
      key={`${english_description.defaultValue}-english_description`}
      name="english_description"
      placeholder={english_description.placeholder}
      title={english_description.title}
      type="textarea"
    />
    <Field
      name="file"
      required={file.required === undefined}
      title={file.title}
      type="file"
    />
    { extension }
  </Form>
);

PaperCreation.propTypes = { onSubmit: PropTypes.func.isRequired };

export default PaperCreation;
