import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createIssue,
  createRubric,
  destroyIssue,
  destroyRubric,
  updateIssue,
  updateRubric,
} from 'modules/magazine';

import ButtonsMenu from 'components/ButtonsMenu';
import ConfirmModal from 'components/ConfirmModal';

import IssueCreation from '../components/IssueCreation';
import IssueUpdating from '../components/IssueUpdating';
import LanguageMenu from '../components/LanguageMenu';
import Papers from '../components/Papers';
import RubricCreation from '../components/RubricCreation';
import RubricUpdating from '../components/RubricUpdating';

class Magazine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
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
    const { issue, issueCreate, issueUpdate, rubric } = this.props;

    let components = [
      {
        Component: IssueCreation,
        props: { onCreate: issueCreate, rubric },
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
    if (this.props.fetching) return null;

    const { isRedactor, isRussian, issue, rubric } = this.props;
    const { body, english, header, isOpen, onConfirm, toggle } = this.state;

    return (
      <Fragment>
        <img className="title" src="/images/magazine.png" alt="Вестник" />
        <LanguageMenu />
        <p className="caption">
          { isRussian ? 'Вестник' : 'Vestnik magazine' }
        </p>
        {
          isRedactor &&
          <ButtonsMenu
            items={this.rubricsComponents()}
            title="Управление рубриками"
          />
        }
        {
          issue ? (
            <div className="main-description">
              {
                isRedactor &&
                <ButtonsMenu
                  items={this.issuesComponents()}
                  title="Управление экземплярами журнала"
                />
              }
              <p className="caption">
                { isRussian ? issue.title : issue.english_title || issue.title }
              </p>
            </div>
          ) : (
            <p className="caption">
              {
                isRussian ? (
                  'Не найдено ни одного выпуска журнала в данной рубрике'
                ) : (
                  'No issues found in this rubric'
                )
              }
            </p>
          )
        }
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
  rubric: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  rubricCreate: PropTypes.func.isRequired,
  rubricDestroy: PropTypes.func.isRequired,
  rubricUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  language,
  magazine: { issues, rubrics },
  user: { role },
}) => ({
  fetching: issues.fetching || rubrics.fetching,
  isRedactor: role === 'redactor',
  isRussian: language === 'russian',
  issue: issues.all.find(issue => issue.id === issues.active),
  rubric: rubrics.all.find(rubric => rubric.id === rubrics.active),
});

const mapDispatchToProps = dispatch => ({
  issueCreate: bindActionCreators(createIssue, dispatch),
  issueDestroy: bindActionCreators(destroyIssue, dispatch),
  issueUpdate: bindActionCreators(updateIssue, dispatch),
  rubricCreate: bindActionCreators(createRubric, dispatch),
  rubricDestroy: bindActionCreators(destroyRubric, dispatch),
  rubricUpdate: bindActionCreators(updateRubric, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Magazine);

