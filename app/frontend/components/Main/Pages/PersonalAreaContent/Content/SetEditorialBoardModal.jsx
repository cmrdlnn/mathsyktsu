import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, DropdownButton, ListGroup, ListGroupItem, Modal, MenuItem, Panel } from 'react-bootstrap'
import { ajaxRequestToServer } from '../../../../../api'

class SetEditorialBoardModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorial_board: null,
      selected_editorials: []
    }
  }

  componentDidMount() {
    ajaxRequestToServer('/select_editorial_board', {}, 'post', 
                        { 'Authorization': 'Bearer '+this.props.token })
    .then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          this.setState({
            editorial_board: data.editorial_board
          })
        })
      } else {
        this.setState({
          editorial_board: false
        })
      }
    })
  }

  selectEditors = (e) => {
    const selected_editorials = this.state.selected_editorials
    if (!selected_editorials.includes(e)) {
      this.setState({
        selected_editorials: [...selected_editorials, e]
      })
    }
  }

  unselectEditorial = (e) => {
    let editorials = this.state.selected_editorials
    editorials.splice(e.target.id, 1)
    this.setState({
      selected_editorials: editorials
    })
  }

  renderEditorialBoard = () => {
    const editorial_board = this.state.editorial_board
    if (editorial_board) {
      let rows = []
      for (var i = 0; i < editorial_board.length; i++) {
        rows.push(
          <MenuItem eventKey={i} key={i}>
           { editorial_board[i].full_name }
          </MenuItem>
        )
      }
      const editorials = this.state.selected_editorials
      let selected_rows = []
      if (editorials.length > 0) {
        for (var i = 0; i < editorials.length; i++) {
          selected_rows.push(
            <ListGroupItem bsStyle="warning" id={i} key={i} onClick={this.unselectEditorial}>
             { this.state.editorial_board[editorials[i]].full_name }
            </ListGroupItem>
          )
        }
      } else {
        selected_rows.push(
          <ListGroupItem bsStyle="warning" key={0}>
            Вы не назначили ни одного члена редколлегии на проверку
          </ListGroupItem>
        )
      }
      return(
        <div>
          <DropdownButton bsStyle='warning' title='Члены редколлегии' id='editorial_board_dropdown' onSelect={this.selectEditors}>
            { rows }
          </DropdownButton>
          <ListGroup>
            { selected_rows }
          </ListGroup>
          <Button bsStyle="warning" onClick={this.setEditorialBoard}>
            Назначить
          </Button>
        </div>
      )
    } else if (editorial_board == false) {
      return(
        <h3>Ошибка загрузки данных</h3>
      )
    } else {
      return(
        <h3>Загрузка...</h3>
      )
    }
  }

  onCloseModal = () => {
    this.setState({
      selected_editorials: []
    })
    this.props.onCloseModal()
  }

  setEditorialBoard = () => {
    if (this.state.selected_editorials.length != 0) {
      const ids = this.state.selected_editorials.map((index) => this.state.editorial_board[index].id)
      ajaxRequestToServer('/set_editorial_board', { editorial_board: ids,
                          publications: this.props.rows }, 'post', 
                          { 'Authorization': 'Bearer '+this.props.token })
      .then(response => {
        if (response.status == 201) {
          this.onCloseModal()
          this.props.updateTable()
        } else {
          alert('Не удалось назначить членов редколлегии на проверку')
        }
      })
    } else {
      alert('Вы не выбрали ни одного представителя редколлегии для проверки выбранных статей')
    }
  }

  render() {
		return(
			<div>
				<Modal show={this.props.modalOpened} onHide={this.onCloseModal}>
		      <Modal.Header className='login-modal-wrap' closeButton>
		        <Modal.Title>Назначение членов редколлегии на проверку</Modal.Title>
		      </Modal.Header>
		      <Modal.Body className='login-modal'>
            { this.renderEditorialBoard() }
		      </Modal.Body>
		      <Modal.Footer className='login-modal-wrap'>
		        <Button bsStyle="warning" onClick={this.onCloseModal}>Закрыть</Button>
		      </Modal.Footer>
		    </Modal>
			</div>
		)
  }
}

function mapStateToProps (state) {
  return {
    token: state.session.token
  }
}

export default connect(mapStateToProps)(SetEditorialBoardModal)