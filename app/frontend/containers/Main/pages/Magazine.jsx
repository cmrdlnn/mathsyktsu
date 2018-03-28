import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createIssue,
  createPaper,
  createRubric,
  destroyIssue,
  destroyPaper,
  destroyRubric,
  updateIssue,
  updatePaper,
  updateRubric,
} from 'modules/magazine';

import ButtonsMenu from 'components/ButtonsMenu';
import ConfirmModal from 'components/ConfirmModal';

import IssueCreation from '../components/IssueCreation';
import IssueUpdating from '../components/IssueUpdating';
import RubricCreation from '../components/RubricCreation';
import RubricUpdating from '../components/RubricUpdating';

class Magazine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
      english: false,
      header: null,
      isOpen: false,
      onConfirm: null,
    };
  }

  toggleRubricDestroying = () => {
    const { rubric, rubricDestroy } = this.props;
    const { isOpen } = this.state;

    if (isOpen) {
      this.setState({ isOpen: !isOpen });
    } else {
      this.setState({
        body: 'Внимание! Вместе с текущей рубрикой удалятся все её экземпляры журнала и статьи.',
        header: 'Вы действительно хотите удалить текущую рубрику?',
        isOpen: !isOpen,
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

  toggleIssueDestroying = () => {
    const { issue, issueDestroy } = this.props;
    const { isOpen } = this.state;

    if (isOpen) {
      this.setState({ isOpen: !isOpen });
    } else {
      this.setState({
        body: 'Внимание! Вместе с текущим экземпляром журнала удалятся все его статьи.',
        header: 'Вы действительно хотите удалить текущий экземпляр журнала?',
        isOpen: !isOpen,
        onConfirm: () => issueDestroy(issue.id),
        toggle: this.toggleIssueDestroying,
      });
    }
  }

  issuesComponents = () => {
    const { issue, issueCreate, issueUpdate } = this.props;

    let components = [
      {
        Component: IssueCreation,
        props: { onCreate: issueCreate },
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
    const { fetching, isRedactor } = this.props;
    const { body, english, header, isOpen, onConfirm, toggle } = this.state;

    if (fetching) return null;

    return (
      <Fragment>
        <img className="title" src="/images/magazine.png" alt="Вестник" />
        <p className="caption">
          { english ? 'Vestnik Magazine' : 'Вестник' }
        </p>
        {
          isRedactor &&
          <ButtonsMenu
            items={this.rubricsComponents()}
            title="Управление рубриками"
          />
        }
        <div className="main-description">
          {
            isRedactor &&
            <ButtonsMenu
              items={this.issuesComponents()}
              title="Управление экземплярами журнала"
            />
          }
        </div>
        {
          isRedactor &&
          <ConfirmModal
            header={header}
            isOpen={isOpen}
            onConfirm={onConfirm}
            toggle={toggle}
          >
            { body }
          </ConfirmModal>
        }
      </Fragment>
    );
  }
}

Magazine.defaultProps = {
  issue: null,
  rubric: null,
};

Magazine.propTypes = {
  fetching: PropTypes.bool.isRequired,
  isRedactor: PropTypes.bool.isRequired,
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  issueCreate: PropTypes.func.isRequired,
  issueDestroy: PropTypes.func.isRequired,
  issueUpdate: PropTypes.func.isRequired,
  paperCreate: PropTypes.func.isRequired,
  paperDestroy: PropTypes.func.isRequired,
  paperUpdate: PropTypes.func.isRequired,
  rubric: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  rubricCreate: PropTypes.func.isRequired,
  rubricDestroy: PropTypes.func.isRequired,
  rubricUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user: { role }, magazine: { issues, rubrics } }) => ({
  fetching: issues.fetching || rubrics.fetching,
  isRedactor: role === 'redactor',
  issue: issues.all.find(issue => issue.id === issues.active),
  rubric: rubrics.all.find(rubric => rubric.id === rubrics.active),
});

const mapDispatchToProps = dispatch => ({
  issueCreate: bindActionCreators(createIssue, dispatch),
  issueDestroy: bindActionCreators(destroyIssue, dispatch),
  issueUpdate: bindActionCreators(updateIssue, dispatch),
  paperCreate: bindActionCreators(createPaper, dispatch),
  paperDestroy: bindActionCreators(destroyPaper, dispatch),
  paperUpdate: bindActionCreators(updatePaper, dispatch),
  rubricCreate: bindActionCreators(createRubric, dispatch),
  rubricDestroy: bindActionCreators(destroyRubric, dispatch),
  rubricUpdate: bindActionCreators(updateRubric, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Magazine);

