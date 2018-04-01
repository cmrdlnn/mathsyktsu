import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonsMenu from 'components/ButtonsMenu';

import RubricCreation from '../components/RubricCreation';
import RubricUpdating from '../components/RubricUpdating';

class RubricsManagment extends Component {
  toggleRubricDestroying = () => {
    const { modalIsOpen, rubric, rubricDestroy, sendModalProps } = this.props;

    if (modalIsOpen) {
      sendModalProps({ isOpen: false });
    } else {
      sendModalProps({
        body: 'Внимание! Вместе с текущей рубрикой удалятся все её экземпляры журнала и статьи.',
        header: 'Вы действительно хотите удалить текущую рубрику?',
        isOpen: true,
        onConfirm: () => rubricDestroy(rubric.id),
        toggle: this.toggleRubricDestroying,
      });
    }
  }

  rubricsComponents = () => {
    const { rubric, rubricCreate, rubricUpdate } = this.props;

    let components = [
      {
        Component: RubricCreation,
        props: { onCreate: rubricCreate },
      },
    ];

    if (rubric) {
      components = components.concat([
        {
          Component: RubricUpdating,
          props: {
            onUpdate: rubricUpdate,
            rubric,
          },
        },
        { onClick: this.toggleRubricDestroying },
      ]);
    }

    return components;
  }

  render() {
    return (
      <ButtonsMenu
        items={this.rubricsComponents()}
        title="Управление рубриками"
      />
    );
  }
}

RubricsManagment.defaultProps = { rubric: null };

RubricsManagment.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  rubric: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  rubricCreate: PropTypes.func.isRequired,
  rubricDestroy: PropTypes.func.isRequired,
  rubricUpdate: PropTypes.func.isRequired,
  sendModalProps: PropTypes.func.isRequired,
};

export default RubricsManagment;
