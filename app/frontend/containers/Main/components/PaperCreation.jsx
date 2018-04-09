import React from 'react';
import PropTypes from 'prop-types';

import PaperForm from './PaperForm';

const hints = {
  autors: {
    placeholder: 'Введите авторов новой статьи...',
    title: 'Авторы новой статьи',
  },
  description: {
    placeholder: 'Введите описание новой статьи...',
    title: 'Описание новой статьи',
  },
  english_autors: {
    placeholder: 'Введите авторов новой статьи на английском языке...',
    title: 'Авторы новой статьи на английском языке',
  },
  english_description: {
    placeholder: 'Введите описание новой статьи на английском языке...',
    title: 'Описание новой статьи на английском языке',
  },
  english_keywords: {
    placeholder: 'Введите ключевые слова новой статьи на английском языке...',
    title: 'Ключевые слова новой статьи на английском языке',
  },
  english_title: {
    placeholder: 'Введите название новой статьи на английском языке...',
    title: 'Название новой статьи на английском языке',
  },
  english_topic: {
    placeholder: 'Введите тему новой статьи на английском языке...',
    title: 'Тема новой статьи на английском языке',
  },
  file: {
    title: 'Файл статьи',
  },
  keywords: {
    placeholder: 'Введите ключевые слова для новой статьи...',
    title: 'Ключевые слова новой статьи',
  },
  title: {
    placeholder: 'Введите название новой статьи...',
    title: 'Название новой статьи',
  },
  topic: {
    placeholder: 'Введите тему новой статьи...',
    title: 'Тема новой статьи',
  },
};

const PaperCreation = ({ onCreate }) => (
  <PaperForm onSubmit={onCreate} hints={hints} />
);

PaperCreation.propTypes = { onCreate: PropTypes.func.isRequired };

export default PaperCreation;
