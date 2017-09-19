import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkToken, fetchRubrics } from '../../../modules'
import { ajaxRequestToServer } from '../../../api'
import MagazineAdministration from './MagazineAdministration'
import ArticlesAdministration from './ArticlesAdministration'
import RubricAdministration from './RubricAdministration'

class Magazine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      access: false,
      english_version: false,
      articles: null
    }
  }

  componentWillMount() {
    const { checkToken, token, role, fetchRubrics } = this.props
    checkToken(token)
    if (role == 'redactor') {
      this.setState({ access: true })
    } else {
      this.setState({ access: false })
    }
    fetchRubrics()
  }

  componentWillReceiveProps(nextProps) {
    const { role, active_issue } = nextProps
    if (role == 'redactor') {
      this.setState({ access: true })
    } else {
      this.setState({ access: false })
    }
    if (active_issue) {
      this.fetchArticles(active_issue.id)
    }
  }

  setHeader = (rubric, issue, english) => {
    if (!rubric) {
      return 'Не найдено ни одной рубрики'
    } else if (!issue) {
      return 'Не найдено ни одного выпуска журнала в данной рубрике'
    } else if (english) {
      return issue.english_title
    } else {
      return issue.title
    }
  }

  fetchArticles = (id) => {
    ajaxRequestToServer(`/papers/${id}/show`)
      .then((response) => {
        if (response.status == 200) {
          response.json().then(json => {
            this.setState({ articles: json })
          })
        }
      })
  }

  renderArticles = () => {
    const { articles, english_version } = this.state,
      active_issue = this.props.active_issue

    if (articles && articles.length) {
      let rubrics = []
      articles.forEach(article => {
        if (english_version && !rubrics.includes(article.english_rubric)) {
          rubrics.push(article.english_rubric)
        } else if (!rubrics.includes(article.rubric)) {
          rubrics.push(article.rubric)
        }
      })

      rubrics = rubrics.map(rubric => {
        let current_arcticles
        if (english_version) {
          current_arcticles = articles.filter(article => article.english_rubric == rubric)
        } else {
          current_arcticles = articles.filter(article => article.rubric == rubric)
        }
        current_arcticles = current_arcticles.map(article => {
          return (
            <div key={article.id}>
              { current_arcticles[0] == article ? (
                <hr className="articles-separation-line" />
              ) : null}
              <p>
                <b>
                  { english_version ? article.english_autors : article.autors }
                </b>
                <i>
                  { ` ${english_version ? article.english_title : article.title}` }
                </i>
              </p>
              <p>
                { english_version ? article.english_description : article.description }
              </p>
              <p>
                <b>
                  { english_version ? 'Keywords: ' : 'Ключевые слова: ' }
                </b>
                { english_version ? article.english_keywords : article.keywords }
              </p>
              <p>
                <a className="download-article" href={`/papers/${article.id}/download`} target="_blank">
                  { english_version ? 'Download article' : 'Скачать статью' }
                </a>
              </p>
              <hr className="articles-separation-line" />
            </div>
          )
        })

        return(
          <div key={rubric.id}>
            <h4>
              { rubric }
            </h4>
            <div className="rubric-containers">
              { current_arcticles }
            </div>
          </div>
        )
      })

      return (
        <div>
          <div className="paper-wrapper">
            <div className="paper-title">
              { english_version ? 'ARTICLES' : 'СТАТЬИ' }
            </div>
            { active_issue.english_title ? (
              english_version ? (
                <div className="language-menu">
                  <div className="rus" onClick={() => this.setState({ english_version: false })} />
                  <div className="eng-active" />
                </div>
              ) : (
                <div className="language-menu">
                  <div className="rus-active" />
                  <div className="eng" onClick={() => this.setState({ english_version: true })} />
                </div>
              )
            ) : null}
          </div>
          { rubrics }
        </div>
      )
    } else {
      return (
        <p className="caption">
          Данный экземпляр журнала не содержит ни одной статьи
        </p>
      )
    }
  }

  render() {
    const { active_issue, active_rubric } = this.props,
      english = this.state.english_version

    return (
      <div className="main-content">
        <img className="title" src="/images/magazine.png" alt="Вестник" />
        { this.state.access ? (
          <RubricAdministration rubric={active_rubric} />
        ) : (
          null 
        )}
        { this.state.access && active_rubric ? (
          <MagazineAdministration
            rubric={active_rubric}
            issue={active_issue}
          />
        ) : (
          null 
        )}
        <p className="caption">
          { this.setHeader(active_rubric, active_issue, english) }
        </p>
        { active_issue && active_issue.filename ? (
          <div style={{overflow: 'hidden'}}>
            <a className="download-link" href={`/issues/${active_issue.id}/download`} target="_blank">
              { english ? 'Download this issue' : 'Скачать полный текст' }
            </a>
          </div>
        ) : null }
        { active_rubric && active_issue ? (
          <div className="main-description">
            { this.state.access && active_issue ? (
              <ArticlesAdministration
                fetchArticles={this.fetchArticles}
                issue={active_issue}
              />) : null 
            }
            { this.renderArticles() }
          </div>
        ) : null}
      </div>
    )
  }
}

Magazine.propTypes = {
  active_rubric: PropTypes.shape({
    id:    PropTypes.number,
    title: PropTypes.string
  }),
  active_issue: PropTypes.shape({
    id:            PropTypes.number,
    title:         PropTypes.string,
    english_title: PropTypes.string,
    filename:      PropTypes.string,
    rubric_id:     PropTypes.number
  }),
  token:        PropTypes.string,
  role:         PropTypes.string,
  checkToken:   PropTypes.func.isRequired,
  fetchRubrics: PropTypes.func.isRequired
}

Magazine.defaultProps = {
  active_rubric: null,
  active_issue: null,
  token: null,
  role: null
}

function mapStateToProps (state) {
  return {
    token: state.session.token,
    role: state.session.role,
    active_rubric: state.magazine.rubrics.active_rubric,
    active_issue: state.magazine.issues.active_issue
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkToken: bindActionCreators(checkToken, dispatch),
    fetchRubrics: bindActionCreators(fetchRubrics, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Magazine)