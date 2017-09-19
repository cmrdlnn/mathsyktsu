import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

class SidebarItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open
    }
  }

  setActiveIssue = (issue) => {
    if (this.props.class != 'sidebar-section-active') {
      this.props.setActiveRubric(this.props.rubric)
    }
    this.props.setActiveIssue(issue)
  }

  openSubmenu = () => {
    const issues = this.props.issues
    if (issues && issues.all.length) {
      this.setState({ open: !this.state.open })
    } else {
      if (this.props.class != 'sidebar-section-active') {
        if (issues && issues.active_issue) {
          this.props.setActiveIssue(null)
        }
        this.props.setActiveRubric(this.props.rubric)
      }
    }
  }

  renderSubmenu = () => {
    let issues = this.props.issues
    let rows = []
    if (issues && issues.all.length) {
      const active_issue = issues.active_issue
      issues = issues.all
      for (let i = 0; i < issues.length; i++) {
        if (active_issue && issues[i].id == active_issue.id) {
          rows.push(
            <div key={issues[i].id} className="sidebar-section-active">
              { issues[i].title }
            </div>
          )
        } else {
          rows.push(
            <div
              key={issues[i].id}
              role="navigation"
              className="sidebar-section"
              onClick={() => this.setActiveIssue(issues[i])}
              style={{ backgroundColor: '#a25c08' }}
            >
              { issues[i].title }
            </div>
          )
        }
      }
    }
    if (rows.length) {
      return (
        <Panel
          collapsible
          expanded={this.state.open}
          style={{ marginBottom: '0', marginLeft: '1vw' }}
        >
          { rows }
        </Panel>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <div className={this.props.class} onClick={this.openSubmenu}>
          { this.props.rubric.title }
        </div>
        { this.renderSubmenu() }
      </div>
    )
  }
}

export default SidebarItem