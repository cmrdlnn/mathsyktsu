import React, { Component } from 'react'
import { ControlLabel, Button, ButtonGroup, FormControl, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import Alerted from '../../../common/Alerted.jsx'
import { ajaxRequestToServer } from '../../../api'
import { encodeFile } from '../../../utils'

class ArticlesAdministration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfPanel: null,
      file: null,
      fileTitle: '',
      titleMessage: null,
      fileMessage: null,
      rubricMessage: null,
      autorsMessage: null,
      descriptionMessage: null,
      keyWordsMessage: null
    }
  }

  openPanel = (number) => {
    if (this.state.numberOfPanel == number) {
      this.setState({ numberOfPanel: null })
    } else {
      this.setState({ numberOfPanel: number })
    }
  }

  selectFile = (result) => {
    this.setState({ fileMessage: null })
    if (result) {
      this.setState({ fileTitle: result.name, file: result.content })
    } else {
      this.setState({ fileTitle: '', file: null })
    }
  }

  createArticle = () => {
    const issue = this.props.issue
    if (this.articleTitle.value == '' ||
        this.articleRubric.value == '' ||
        this.articleAutors.value == '' ||
        this.articleDescription.value == '' ||
        this.articleKeyWords.value == '' ||
        this.state.file == null) {
      if (this.articleTitle.value == '') {
        this.setState({
          titleMessage: 'Вы не заполнили поле "Название статьи"'
        })
      }
      if (this.state.file == null) {
        this.setState({
          fileMessage: 'Вы не выбрали файл статьи'
        })
      }
      if (this.articleRubric.value == '') {
        this.setState({
          rubricMessage: 'Вы не заполнили поле "Рубрика"'
        })
      }
      if (this.articleAutors.value == '') {
        this.setState({
          autorsMessage: 'Вы не заполнили поле "Авторы статьи"'
        })
      }
      if (this.articleDescription.value == '') {
        this.setState({
          descriptionMessage: 'Вы не заполнили поле "Описание статьи"'
        })
      }
      if (this.articleKeyWords.value == '') {
        this.setState({
          keyWordsMessage: 'Вы не заполнили поле "Ключевые слова"'
        })
      }
    } else {
      let data = {
        title: this.articleTitle.value,
        rubric: this.articleRubric.value,
        autors: this.articleAutors.value,
        description: this.articleDescription.value,
        keywords: this.articleKeyWords.value,
        file: this.state.file,
        filename: this.state.fileTitle,
        issue_id: this.props.issue.id
      }
      if (issue.english_title) {
        let english = true, english_data = {}
        if (this.articleEnglishTitle.value != '') {
          english_data = Object.assign(english_data, { english_title: this.articleEnglishTitle.value })
        } else {
          english = false
        }
        if (this.articleEnglishRubric.value != '') {
          english_data = Object.assign(english_data, { english_rubric: this.articleEnglishRubric.value })
        } else {
          english = false
        }
        if (this.articleEnglishAutors.value != '') {
          english_data = Object.assign(english_data, { english_autors: this.articleEnglishAutors.value })
        } else {
          english = false
        }
        if (this.articleEnglishDescription.value != '') {
          english_data = Object.assign(english_data, { english_description: this.articleEnglishDescription.value })
        } else {
          english = false
        }
        if (this.articleEnglishKeyWords.value != '') {
          english_data = Object.assign(english_data, { english_keywords: this.articleEnglishKeyWords.value })
        } else {
          english = false
        }
        if (!english) {
          if (!confirm('Вы заполнили не все поля для английской версии статьи. Создать только русскую версию статьи?')) {
            return
          }
        }
        data = Object.assign(data, english_data)
      }
      data = { paper: data }
      ajaxRequestToServer('/papers/create', data, 'post',
        { 'Authorization': 'Bearer '+this.props.token })
        .then((response) => {
          if (response.status == 201) {
            this.props.fetchArticles(this.props.issue.id)
            alert('Новая статья успешно создана')
          } else {
            alert('Во время создания новой статьи произошла ошибка')
          }
        })
    }
  }

  render() {
    const issue = this.props.issue
    return (
      <div style={{marginBottom: '2vh'}}>
        <h4 style={{padding: '1vh 3% 0'}}>Управление статьями экземплярами журнала</h4>
        <ButtonGroup style={{padding: '0 3%'}}>
          <Button
            bsStyle="success"
            onClick={() => {
              this.openPanel(1)
            }}
          >
            Добавить
          </Button>
          <Button
            bsStyle="info"
            onClick={() => {
              this.openPanel(2)
            }}
          >
            Изменить
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => {
              this.openPanel(3)
            }}
          >
            Удалить
          </Button>
        </ButtonGroup>
        <Panel collapsible expanded={this.state.numberOfPanel == 1}>
          <ControlLabel style={{marginTop: '2vh'}}>Название статьи</ControlLabel>
          <FormControl
            type="text"
            placeholder="Введите название"
            inputRef={(input) => { this.articleTitle = input }}
            style={{marginBottom: '2vh'}}
            onChange={() => this.setState({titleMessage: null})}
          />
          { Alerted(this.state.titleMessage, !this.state.titleMessage) }
          <ControlLabel>Файл статьи</ControlLabel>
          <div className="fileform" style={{ margin: '0 0 2vh' }}>
            <div className="fileformlabel">{ this.state.fileTitle }</div>
            <div className="selectbutton">Обзор</div>
            <input ref='issue' className="upload" type="file" onChange={e => encodeFile(e, this.selectFile)}/>
          </div>
          { Alerted(this.state.fileMessage, !this.state.fileMessage) }
          {issue && issue.english_title ? (
            <div>
              <ControlLabel>Название статьи на английском языке</ControlLabel>
              <FormControl
                type="text"
                placeholder="Введите название на английском"
                inputRef={(input) => { this.articleEnglishTitle = input; }}
                style={{marginBottom: '2vh'}}
              />
            </div>
          ) : null}
          <ControlLabel>Рубрика</ControlLabel>
          <FormControl
            type="text"
            placeholder="Введите рубрику"
            inputRef={(input) => { this.articleRubric = input }}
            style={{marginBottom: '2vh'}}
            onChange={() => this.setState({rubricMessage: null})}
          />
          { Alerted(this.state.rubricMessage, !this.state.rubricMessage) }
          {issue && issue.english_title ? (
            <div>
              <ControlLabel>Рубрика на английском языке</ControlLabel>
              <FormControl
                type="text"
                placeholder="Введите рубрику на английском языке"
                inputRef={(input) => { this.articleEnglishRubric = input }}
                style={{marginBottom: '2vh'}}
              />
            </div>
          ) : null}
          <ControlLabel>Авторы статьи</ControlLabel>
          <FormControl
            type="text"
            placeholder="Введите авторов статьи"
            inputRef={(input) => { this.articleAutors = input }}
            style={{marginBottom: '2vh'}}
            onChange={() => this.setState({autorsMessage: null})}
          />
          { Alerted(this.state.autorsMessage, !this.state.autorsMessage) }
          {issue && issue.english_title ? (
            <div>
              <ControlLabel>Авторы статьи на английском языке</ControlLabel>
              <FormControl
                type="text"
                placeholder="Введите авторов статьи на английском языке"
                inputRef={(input) => { this.articleEnglishAutors = input }}
                style={{marginBottom: '2vh'}}
              />
            </div>
          ) : null}
          <ControlLabel>Описание статьи</ControlLabel>
          <FormControl
            componentClass="textarea"
            style={{resize: 'none', marginBottom: '2vh'}}
            placeholder="Введите описание статьи"
            inputRef={(input) => { this.articleDescription = input }}
            onChange={() => this.setState({descriptionMessage: null})}
          />
          { Alerted(this.state.descriptionMessage, !this.state.descriptionMessage) }
          {issue && issue.english_title ? (
            <div>
              <ControlLabel>Описание статьи на английском языке</ControlLabel>
              <FormControl
                componentClass="textarea"
                style={{resize: 'none', marginBottom: '2vh'}}
                placeholder="Введите описание статьи на английском языке"
                inputRef={(input) => { this.articleEnglishDescription = input }}
              />
            </div>
          ) : null}
          <ControlLabel>Ключевые слова</ControlLabel>
          <FormControl
            type="text"
            placeholder="Введите ключевые слова"
            inputRef={(input) => { this.articleKeyWords = input }}
            style={{marginBottom: '2vh'}}
            onChange={() => this.setState({keyWordsMessage: null})}
          />
          { Alerted(this.state.keyWordsMessage, !this.state.keyWordsMessage) }
          {issue && issue.english_title ? (
            <div>
              <ControlLabel>Ключевые слова на английском языке</ControlLabel>
              <FormControl
                type="text"
                placeholder="Введите ключевые слова на английском языке"
                inputRef={(input) => { this.articleEnglishKeyWords = input; }}
                style={{marginBottom: '2vh'}}
              />
            </div>
          ) : null}
          <Button bsStyle="warning" onClick={this.createArticle}>Создать</Button>
        </Panel>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.session.token
  }
}

export default connect(mapStateToProps)(ArticlesAdministration)