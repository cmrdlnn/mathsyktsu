import React, { Component, Fragment } from 'react';
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

import ConfirmModal from 'components/ConfirmModal';

import LanguageMenu from '../containers/LanguageMenu';
import Issue from '../containers/Issue';
import RubricsManagment from '../components/RubricsManagment';
import IssuesManagment from '../components/IssuesManagment';

class Magazine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null,
      header: null,
      isOpen: false,
      onConfirm: null,
      toggle: null,
    };
  }

  setModalProps = (modalProps) => {
    this.setState(modalProps);
  }

  render() {
    if (this.props.fetching) return null;

    const {
      isRedactor,
      isRussian,
      issue,
      issueCreate,
      issueDestroy,
      issueUpdate,
      rubric,
      rubricCreate,
      rubricDestroy,
      rubricUpdate,
    } = this.props;

    const { body, header, isOpen, onConfirm, toggle } = this.state;

    return (
      <Fragment>
        <img className="title" src="/images/magazine.png" alt="Вестник" />
        <LanguageMenu />
        <p className="caption">
          { isRussian ? 'Вестник' : 'Vestnik magazine' }
        </p>
        {
          isRedactor
          && (
            <Fragment>
              <RubricsManagment
                modalIsOpen={isOpen}
                rubric={rubric}
                rubricCreate={rubricCreate}
                rubricDestroy={rubricDestroy}
                rubricUpdate={rubricUpdate}
                sendModalProps={this.setModalProps}
              />
              { rubric
                && (
                  <ConfirmModal
                    header={header}
                    isOpen={isOpen}
                    onConfirm={onConfirm}
                    toggle={toggle}
                  >
                    { body }
                  </ConfirmModal>
                )
              }
            </Fragment>
          )
        }
        {
          rubric ? (
            <Fragment>
              { isRedactor
                && (
                  <IssuesManagment
                    issue={issue}
                    issueCreate={issueCreate}
                    issueDestroy={issueDestroy}
                    issueUpdate={issueUpdate}
                    modalIsOpen={isOpen}
                    rubric={rubric}
                    sendModalProps={this.setModalProps}
                  />
                )
              }
              <Issue
                isRedactor={isRedactor}
                isRussian={isRussian}
                issue={issue}
                rubric={rubric}
              />
            </Fragment>
          ) : (
            <p className="caption">
              { isRussian ? 'Не найдено ни одной рубрики' : 'Not found any rubric' }
            </p>
          )
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
  isRussian: PropTypes.bool.isRequired,
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

