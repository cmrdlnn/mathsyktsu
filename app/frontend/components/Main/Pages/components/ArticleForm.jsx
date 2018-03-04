import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import Field from './Field'
import { ajaxRequestToServer } from '../../../../api'

class ArticleForm extends Component {
  createArticle = () => {
    const { issueId, token } = this.props

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
        issue_id: issueId
      }
      if (issue.english_title) {
        let english = true, english_data = {}
        if (this.articleEnglishTitle.value != '') {
          english_data = { ...english_data, english_title: this.articleEnglishTitle.value }
        } else {
          english = false
        }
        if (this.articleEnglishRubric.value != '') {
          english_data = { ...english_data, english_rubric: this.articleEnglishRubric.value }
        } else {
          english = false
        }
        if (this.articleEnglishAutors.value != '') {
          english_data = { ...english_data, english_autors: this.articleEnglishAutors.value }
        } else {
          english = false
        }
        if (this.articleEnglishDescription.value != '') {
          english_data = { ...english_data, english_description: this.articleEnglishDescription.value }
        } else {
          english = false
        }
        if (this.articleEnglishKeyWords.value != '') {
          english_data = { ...english_data, english_keywords: this.articleEnglishKeyWords.value }
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
        { 'Authorization': `Bearer ${token}` })
        .then((response) => {
          if (response.status == 201) {
            this.props.fetchArticles(issueId)
            alert('Новая статья успешно создана')
          } else {
            alert('Во время создания новой статьи произошла ошибка')
          }
        })
    }
  }

  render() {
    const { englishVersion } = this.props

    return(
      <div>
        <Field
          title="Название статьи"
          placeholder="Введите название"
          message=""
        />
        <Field type="file" title="Файл статьи" />
        { englishVersion ? (
          <Field
            title="Название статьи на английском языке"
            placeholder="Введите название статьи на английском языке"
          />
        ) : (
          null
        )}
        <Field
          title="Название рубрики"
          placeholder="Введите название рубрики"
        />
        { englishVersion ? (
          <Field
            title="Название рубрики на английском языке"
            placeholder="Введите название рубрики на английском языке"
          />
        ) : (
          null
        )}
        <Field title="Авторы статьи" placeholder="Введите авторов статьи" />
        { englishVersion ? (
          <Field
            title="Авторы статьи на английском языке"
            placeholder="Введите авторов статьи на английском языке"
          />
        ) : (
          null
        )}
        <Field
          title="Описание статьи"
          placeholder="Введите описание статьи"
          componentClass="textarea"
          style={{resize: 'none'}}
        />
        { englishVersion ? (
          <Field
            title="Описание статьи на английском языке"
            placeholder="Введите описание статьи на английском языке"
          />
        ) : (
          null
        )}
        <Field title="Ключевые слова" placeholder="Введите ключевые слова" />
        { englishVersion ? (
          <Field
            title="Ключевые слова на английском языке"
            placeholder="Введите ключевые слова на английском языке"
          />
        ) : (
          null
        )}
        <Button bsStyle="warning" onClick={this.createArticle}>Создать</Button>
      </div>

    )
  }
}

ArticleForm.propTypes = {
  englishVersion: PropTypes.bool
}

ArticleForm.defaultProps = {
  englishVersion: false
}

export default ArticleForm