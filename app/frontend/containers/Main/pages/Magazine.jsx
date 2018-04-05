import React, { Component, Fragment } from 'react';
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
  indexPapers,
  updateIssue,
  updatePaper,
  updateRubric,
} from 'modules/magazine';

import ConfirmModal from 'components/ConfirmModal';

import Issue from '../containers/Issue';
import LanguageMenu from '../containers/LanguageMenu';
import Papers from '../containers/Papers';

import IssuesManagment from '../components/IssuesManagment';
import PapersManagment from '../components/PapersManagment';
import RubricsManagment from '../components/RubricsManagment';

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
      paperCreate,
      paperDestroy,
      papers,
      papersIndex,
      paperUpdate,
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
                    rubricId={rubric.id}
                    sendModalProps={this.setModalProps}
                  />
                )
              }
              <Issue
                isRedactor={isRedactor}
                isRussian={isRussian}
                issue={issue}
                rubric={rubric}
              >
                { isRedactor
                  && (
                    <PapersManagment
                      issue={issue}
                      paperCreate={paperCreate}
                      paperDestroy={paperDestroy}
                      papersExists={!!papers.all.length && !papers.fetching}
                      paperUpdate={paperUpdate}
                    />
                  )
                }
                <Papers
                  isRussian={isRussian}
                  issue={issue}
                  papers={papers}
                  papersIndex={papersIndex}
                />
              </Issue>
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
    english_title: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  issueCreate: PropTypes.func.isRequired,
  issueDestroy: PropTypes.func.isRequired,
  issueUpdate: PropTypes.func.isRequired,
  paperCreate: PropTypes.func.isRequired,
  paperDestroy: PropTypes.func.isRequired,
  papers: PropTypes.shape({
    all: PropTypes.arrayOf(
      PropTypes.shape({
        autors: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        english_autors: PropTypes.string.isRequired,
        english_description: PropTypes.string.isRequired,
        english_keywords: PropTypes.string.isRequired,
        english_title: PropTypes.string.isRequired,
        english_topic: PropTypes.string.isRequired,
        filename: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        keywords: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        topic: PropTypes.string.isRequired,
      }),
    ).isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  papersIndex: PropTypes.func.isRequired,
  paperUpdate: PropTypes.func.isRequired,
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
  magazine: { issues, papers, rubrics },
  user: { role },
}) => ({
  fetching: issues.fetching || rubrics.fetching,
  isRedactor: role === 'redactor',
  isRussian: language === 'russian',
  issue: issues.all.find(issue => issue.id === issues.active),
  papers,
  rubric: rubrics.all.find(rubric => rubric.id === rubrics.active),
});

const mapDispatchToProps = dispatch => ({
  issueCreate: bindActionCreators(createIssue, dispatch),
  issueDestroy: bindActionCreators(destroyIssue, dispatch),
  issueUpdate: bindActionCreators(updateIssue, dispatch),
  paperCreate: bindActionCreators(createPaper, dispatch),
  paperDestroy: bindActionCreators(destroyPaper, dispatch),
  papersIndex: bindActionCreators(indexPapers, dispatch),
  paperUpdate: bindActionCreators(updatePaper, dispatch),
  rubricCreate: bindActionCreators(createRubric, dispatch),
  rubricDestroy: bindActionCreators(destroyRubric, dispatch),
  rubricUpdate: bindActionCreators(updateRubric, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Magazine);

