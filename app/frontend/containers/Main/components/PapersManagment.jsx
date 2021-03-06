import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonsMenu from 'components/ButtonsMenu';

import PaperCreation from '../components/PaperCreation';
import PaperDestroying from '../components/PaperDestroying';
import PaperUpdating from '../components/PaperUpdating';

class PapersManagment extends Component {
  toggleIssueDestroying = () => {
    const { modalIsOpen, issue, issueDestroy, sendModalProps } = this.props;

    if (modalIsOpen) {
      sendModalProps({ isOpen: false });
    } else {
      sendModalProps({
        body: 'Внимание! Вместе с текущим экземпляром журнала удалятся все его статьи.',
        header: 'Вы действительно хотите удалить текущий экземпляр журнала?',
        isOpen: true,
        onConfirm: () => issueDestroy(issue.id),
        toggle: this.toggleIssueDestroying,
      });
    }
  }

  papersComponents = () => {
    const {
      issue,
      modalIsOpen,
      paperCreate,
      paperDestroy,
      papers,
      papersExists,
      paperUpdate,
      sendModalProps,
      topics,
    } = this.props;

    if (!issue) return [];

    let components = [
      {
        Component: PaperCreation,
        props: { onCreate: (data) => { paperCreate(data, issue.id); } },
      },
    ];

    if (papersExists) {
      components = components.concat([
        {
          Component: PaperUpdating,
          props: { onUpdate: paperUpdate, papers, topics },
        },
        {
          Component: PaperDestroying,
          props: { modalIsOpen, onDestroy: paperDestroy, sendModalProps, topics },
        },
      ]);
    }

    return components;
  }

  render() {
    return (
      <ButtonsMenu
        items={this.papersComponents()}
        title="Управление статьями"
      />
    );
  }
}

PapersManagment.defaultProps = { issue: null };

PapersManagment.propTypes = {
  issue: PropTypes.shape({
    english_title: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  paperCreate: PropTypes.func.isRequired,
  paperDestroy: PropTypes.func.isRequired,
  papersExists: PropTypes.bool.isRequired,
  paperUpdate: PropTypes.func.isRequired,
};

export default PapersManagment;
