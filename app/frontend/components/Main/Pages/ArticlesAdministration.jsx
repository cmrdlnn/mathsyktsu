import React, { Component } from 'react'
import { Button, ButtonGroup, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import ArticleForm from './components/ArticleForm'

class ArticlesAdministration extends Component {
  constructor(props) {
    super(props)
    this.state = { numberOfPanel: null }
  }

  openPanel = (number) => {
    const { numberOfPanel } = this.state
    this.setState({ numberOfPanel: numberOfPanel == number ? null : number })
  }

  render() {
    const { issue, token } = this.props

    return (
      <div style={{ marginBottom: '2vh' }}>
        <h4 style={{ padding: '1vh 3% 0' }}>Управление статьями экземплярами журнала</h4>
        <ButtonGroup style={{ padding: '0 3%' }}>
          <Button
            bsStyle="success"
            onClick={() => this.openPanel(1)}
          >
            Добавить
          </Button>
          <Button
            bsStyle="info"
            onClick={() => this.openPanel(2)}
          >
            Изменить
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => this.openPanel(3)}
          >
            Удалить
          </Button>
        </ButtonGroup>
        <Panel collapsible expanded={this.state.numberOfPanel == 1}>
          <ArticleForm
            issueId={issue}
            englishVersion={issue && issue.english_title}
            token={token}
          />
        </Panel>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.session.token
  }
}

export default connect(mapStateToProps)(ArticlesAdministration)