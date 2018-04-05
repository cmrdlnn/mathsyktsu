import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';
import Field from 'components/Field';
import Form from 'components/Form';

const IssueUpdating = ({
  issue: {
    english_title: englishTitle,
    filename,
    id,
    title,
  },
  onUpdate,
}) => {
  const currentFile = filename ? ` (текущий файл: ${filename})` : '';

  return (
    <Form buttonText="Изменить" onSubmit={(data) => { onUpdate(id, data); }}>
      <Field
        defaultValue={title}
        key={title}
        name="title"
        placeholder="Введите новое название экземпляра журнала..."
        required
        title="Новое название экземпляра журнала"
      />
      <Field
        defaultValue={englishTitle}
        helper="Необязательно"
        key={englishTitle}
        name="english_title"
        placeholder="Введите новое название экземпляра журнала на английском языке..."
        title="Новое название экземпляра журнала на английском языке"
      />
      <Field
        helper="Необязательно"
        name="file"
        title={`Новый файл экземпляра журнала${currentFile}`}
        type="file"
      />
      { filename
        && (
          <Checkbox
            name="delete_file"
            title={`Удалить текущий файл экземпляра журнала?${currentFile}`}
          />
        )
      }
    </Form>
  );
};

IssueUpdating.defaultProps = { issue: null };

IssueUpdating.propTypes = {
  issue: PropTypes.shape({
    english_title: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default IssueUpdating;
