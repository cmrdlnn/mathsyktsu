import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonsMenu from 'components/ButtonsMenu';

import IssueCreation from '../components/IssueCreation';
import IssueUpdating from '../components/IssueUpdating';

class IssuessManagment extends Component {
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

  issuesComponents = () => {
    const { issue, issueCreate, issueUpdate, rubricId } = this.props;

    let components = [
      {
        Component: IssueCreation,
        props: { onCreate: issueCreate, rubricId },
      },
    ];

    if (issue) {
      components = components.concat([
        {
          Component: IssueUpdating,
          props: {
            issue,
            onUpdate: issueUpdate,
          },
        },
        { onClick: this.toggleIssueDestroying },
      ]);
    }

    return components;
  }

  render() {
    return (
      <ButtonsMenu
        items={this.issuesComponents()}
        title="Управление экземплярами журнала"
      />
    );
  }
}

IssuessManagment.defaultProps = { issue: null };

IssuessManagment.propTypes = {
  issue: PropTypes.shape({
    english_title: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  issueCreate: PropTypes.func.isRequired,
  issueDestroy: PropTypes.func.isRequired,
  issueUpdate: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  rubricId: PropTypes.number.isRequired,
  sendModalProps: PropTypes.func.isRequired,
};

export default IssuessManagment;
