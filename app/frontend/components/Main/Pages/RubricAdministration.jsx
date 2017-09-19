import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ControlLabel, Button, ButtonGroup, FormControl, Panel } from 'react-bootstrap'
import { addRubric, changeRubric, deleteRubric } from '../../../modules'
import Alerted from '../../../common/Alerted'
import { ajaxRequestToServer } from '../../../api'

class RubricAdministration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfPanel: null,
      rubricMessage: null,
      rubricChangeMessage: null,
      rubricDeleteMessage: null
    }
  }

  openPanel = (number) => {
    if (this.state.numberOfPanel == number) {
      this.setState({
        numberOfPanel: null
      })
    } else {
      this.setState({ numberOfPanel: number })
    }
  }

  createRubric = () => {
    const { token, addRubric } = this.props,
      new_rubric = this.rubricTitle.value
    if (new_rubric != '') {
      ajaxRequestToServer('/rubrics/create', { rubric: { title: new_rubric }}, 'post', { 'Authorization': `Bearer ${token}` })
        .then(response => {
          if (response.status == 201) {
            this.setState({
              rubricMessage: 'Новый пункт меню успешно создан'
            })
            response.json().then(json => addRubric(json))
          } else if (response.status == 409) {
            this.setState({
              rubricMessage: 'Пункт меню с таким наименованием уже существует'
            })
          }
        })
    } else {
      this.setState({
        rubricMessage: 'Вы не ввели название нового пункта меню'
      })
    }
  }

  changeRubric = () => {
    const { rubric, token, changeRubric } = this.props,
      new_title = this.rubricChangeTitle.value
    if (new_title != '') {
      ajaxRequestToServer('/rubrics/change', 
        { rubric: { id: rubric.id, title: new_title } },
        'PATCH',
        { 'Authorization': `Bearer ${token}` })
        .then(response => {
          if (response.status == 200) {
            this.setState({
              rubricChangeMessage: 'Название пункта меню успешно изменено'
            })
            changeRubric(rubric.id, new_title)
          } else if (response.status == 409) {
            this.setState({
              rubricChangeMessage: 'Пункт меню с таким наименованием уже существует'
            })
          }
        })
    } else {
      this.setState({
        rubricChangeMessage: 'Вы не ввели новое название пункта меню'
      })
    }
  }

  deleteRubric = () => {
    const { rubric, deleteRubric, token } = this.props
    if (confirm('Вы действительно хотите удалить данный пункт меню? ВНИМАНИЕ! ПРИ ЕГО УДАЛЕНИИ ТАКЖЕ УДАЛЯТСЯ ВСЕ НОМЕРА ЖУРНАЛОВ И СТАТЬИ, КОТОРЫЕ ОН СОДЕРЖИТ.')) {
      ajaxRequestToServer('/rubrics/delete', { rubric: { id: rubric.id } }, 'delete', { 'Authorization': `Bearer ${token}` })
        .then(response => {
          if (response.status == 204) {
            deleteRubric(rubric.id)
            alert('Рубрика успешно удалена')
          } else {
            alert('При удалении рубрики произошла ошибка')
          }
        })
    }
  }

  render() {
    const rubric = this.props.rubric

    return (
      <div>
        <h4 style={{padding: '1vh 3% 0'}}>Управление пунктами меню</h4>
        <ButtonGroup style={{padding: '0 3%'}}>
          <Button
            bsStyle="success"
            onClick={() => this.openPanel(1)}
          >
            Добавить
          </Button>
          { rubric ? (
            <Button
              bsStyle="info"
              onClick={() => this.openPanel(2)}
            >
              Изменить
            </Button>
          ) : null}
          { rubric ? (
            <Button
              bsStyle="danger"
              onClick={this.deleteRubric}
            >
              Удалить
            </Button>
          ) : null}
        </ButtonGroup>
        <Panel collapsible expanded={this.state.numberOfPanel == 1} style={{margin: '1vh 3%'}}>
          <ControlLabel>Название нового пункта меню</ControlLabel>
          <FormControl
            type="text"
            placeholder="Введите название нового пункта меню"
            inputRef={(input) => this.rubricTitle = input}
            style={{marginBottom: '2vh'}}
            onChange={() => this.setState({rubricMessage: null})}
          />
          { Alerted(
            this.state.rubricMessage,
            !this.state.rubricMessage,
            this.state.rubricMessage == 'Новый пункт меню успешно создан' ? 'success' : 'danger'
          )}
          <Button bsStyle="warning" onClick={this.createRubric}>Создать</Button>
        </Panel>
        <Panel collapsible expanded={this.state.numberOfPanel == 2} style={{margin: '1vh 3%'}}>
          <ControlLabel>Название текущего пункта меню</ControlLabel>
          <FormControl
            type="text"
            placeholder="Введите новое название пункта меню"
            inputRef={(input) => this.rubricChangeTitle = input}
            style={{marginBottom: '2vh'}}
            onChange={() => this.setState({rubricChangeMessage: null})}
          />
          { Alerted(
            this.state.rubricChangeMessage,
            !this.state.rubricChangeMessage,
            this.state.rubricChangeMessage == 'Название пункта меню успешно изменено' ? 'success' : 'danger'
          )}
          <Button bsStyle="warning" onClick={this.changeRubric}>Изменить</Button>
        </Panel>
      </div>
    )
  }
}

RubricAdministration.propTypes = {
  rubric: PropTypes.shape({
    id:    PropTypes.number,
    title: PropTypes.string
  }),
  token:        PropTypes.string.isRequired,
  addRubric:    PropTypes.func.isRequired,
  changeRubric: PropTypes.func.isRequired,
  deleteRubric: PropTypes.func.isRequired
}

RubricAdministration.defaultProps = {
  rubric: null,
  token: null
}

function mapStateToProps (state) {
  return {
    token: state.session.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addRubric: bindActionCreators(addRubric, dispatch),
    changeRubric: bindActionCreators(changeRubric, dispatch),
    deleteRubric: bindActionCreators(deleteRubric, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RubricAdministration)