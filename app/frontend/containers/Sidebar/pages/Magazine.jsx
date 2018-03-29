import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  indexIssues,
  indexPapers,
  indexRubrics,
  setActiveIssue,
  setActiveRubric,
} from 'modules/magazine';

import SidebarMenu from 'components/SidebarMenu';

class Magazine extends Component {
  componentWillMount() {
    const { issuesIndex, rubricsIndex } = this.props;

    rubricsIndex()
      .then(() => issuesIndex())
      .then(() => { this.makeItemsActive(); });
  }

  componentWillReceiveProps(nextProps) {
    const { issues: { active }, papersIndex } = nextProps;

    if (this.props.issues.active !== active) {
      papersIndex(active);
    }
  }

  makeItemsActive = () => {
    const {
      issues: { all: issues },
      rubrics: { all: rubrics },
      setIssue,
      setRubric,
    } = this.props;

    if (rubrics[0]) {
      const issueByRubric = issues.find(issue => issue.rubric_id === rubrics[0].id);

      if (issueByRubric) {
        setIssue(issueByRubric);
      } else {
        setRubric(rubrics[0]);
      }
    }
  }

  prepareMenuItems = (issues, rubrics) => (
    rubrics.map(rubric => (
      {
        ...rubric,
        subitems: issues.filter(issue => rubric.id === issue.rubric_id),
      }
    ))
  )

  handleItemClick = (rubricId) => {
    this.props.setRubric(rubricId);
  }

  handleSubitemClick = (issueId) => {
    this.props.setIssue(issueId);
  }

  render() {
    const { issues, rubrics } = this.props;

    if (issues.fetching || rubrics.fetching) return null;

    return (
      <SidebarMenu
        activeItem={rubrics.active}
        activeSubitem={issues.active}
        items={this.prepareMenuItems(issues.all, rubrics.all)}
        onItemClick={this.handleItemClick}
        onSubitemClick={this.handleSubitemClick}
      />
    );
  }
}

Magazine.propTypes = {
  issues: PropTypes.shape({
    active: PropTypes.number,
    all: PropTypes.arrayOf(
      PropTypes.shape({
        english_title: PropTypes.string,
        filename: PropTypes.string,
        id: PropTypes.number,
        rubric_id: PropTypes.number,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  issuesIndex: PropTypes.func.isRequired,
  rubrics: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    all: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  rubricsIndex: PropTypes.func.isRequired,
  setIssue: PropTypes.func.isRequired,
  setRubric: PropTypes.func.isRequired,
};

const mapStateToProps = ({ magazine: { issues, rubrics } }) => ({ issues, rubrics });

const mapDispatchToProps = dispatch => ({
  issuesIndex: bindActionCreators(indexIssues, dispatch),
  papersIndex: bindActionCreators(indexPapers, dispatch),
  rubricsIndex: bindActionCreators(indexRubrics, dispatch),
  setIssue: bindActionCreators(setActiveIssue, dispatch),
  setRubric: bindActionCreators(setActiveRubric, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Magazine);
