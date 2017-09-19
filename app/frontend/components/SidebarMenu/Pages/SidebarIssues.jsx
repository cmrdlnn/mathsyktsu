import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setActiveIssue, setActiveRubric } from '../../../modules'
import SidebarItem from '../components/SidebarItem'

class SidebarIssues extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.active_rubric && !nextProps.active_issue) {
      const active_rubric = nextProps.active_rubric,
        issues = nextProps.issues.filter(issue => issue.rubric_id == active_rubric.id)
      if (issues.length) {
        this.props.setActiveIssue(issues[0])
      }
    }
  }

  filterIssues = (id) => {
    const { issues, active_issue } = this.props
    if (issues.length) {
      return {
        all: issues.filter(issue => issue.rubric_id == id),
        active_issue: active_issue
      }
    } else {
      return null
    }
  }

  render() {
    const { rubrics, active_rubric } = this.props
    let rows = []
    if (rubrics.length && active_rubric) {
      for (let i = 0; i < rubrics.length; i++) {
        if (active_rubric.id == rubrics[i].id) {
          rows.push(
            <SidebarItem 
              key={i}
              open
              rubric={rubrics[i]}
              class="sidebar-section-active"
              issues={this.filterIssues(rubrics[i].id)}
              setActiveIssue={this.props.setActiveIssue}
            />
          )
        } else {
          rows.push(
            <SidebarItem
              key={i}
              open={false}
              rubric={rubrics[i]}
              class="sidebar-section"
              issues={this.filterIssues(rubrics[i].id)}
              setActiveIssue={this.props.setActiveIssue}
              setActiveRubric={this.props.setActiveRubric}
            />
          )
        }
      }
    }
    return (
      <div>
        { rows.length > 0 ? rows : null }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    rubrics: state.magazine.rubrics.all,
    active_rubric: state.magazine.rubrics.active_rubric,
    issues: state.magazine.issues.all,
    active_issue: state.magazine.issues.active_issue,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveIssue: bindActionCreators(setActiveIssue, dispatch),
    setActiveRubric: bindActionCreators(setActiveRubric, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarIssues)
