import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, DropdownButton, MenuItem, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { ajaxRequestToServer } from '../../../../../api'

class PublicationEditorialModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'Возможные решения'
    }
  }

  statusSelect = (status) => {
    this.setState({
      status: status
    })
  }

  onCloseModal = () => {
    this.setState({
      status: 'Возможные решения'
    })
    this.props.onCloseModal()
  }

  selectionResult = () => {
    const status = this.state.status
    if (status == 'Одобрено') {
      return (
        <div>
          <Button bsStyle="success" onClick={this.setDecision}>
            Подтвердить
          </Button>
        </div>
      )
    } else if (status == 'Условно одобрено') {
      return (
        <div>
          <FormGroup controlId="comment">
            <ControlLabel>Комментарий</ControlLabel>
            <FormControl
              inputRef={(ref) => {this.comment = ref}}
              componentClass="textarea"
              placeholder="Введите комментарий к условно одобряемой статье"
              style={{resize: 'none'}}
            />
          </FormGroup>
          <Button bsStyle="warning" onClick={this.setDecision}>
            Подтвердить
          </Button>
        </div>
      )
    } else if (status == 'Отклонено') {
      return (
        <div>
          <FormGroup controlId="comment">
            <ControlLabel>Комментарий</ControlLabel>
            <FormControl
              inputRef={(ref) => {this.comment = ref}}
              componentClass="textarea"
              placeholder="Введите комментарий к отклоняемой статье"
              style={{resize: 'none'}}
            />
          </FormGroup>
          <Button bsStyle="danger" onClick={this.setDecision}>
            Подтвердить
          </Button>
        </div>
      )
    }
  }

  setDecision = () => {
    const status = this.state.status
    if (status == 'Одобрено' || 
        status == 'Условно одобрено' ||
        status == 'Отклонено') {
      const data = { id: this.props.id, status: status }
      if (status != 'Одобрено') {
        if (this.comment.value != '') {
          data.comment = this.comment.value
        } else {
          alert('Вы не ввели комментарий к вашему решению')
          return
        }
      }
      ajaxRequestToServer('/publications/set_status', 
                          { publication: data }, 
                          'post', {'Authorization': 'Bearer '+this.props.token})
      .then(response => {
        if (response.status == 200) {
          this.onCloseModal()
          this.props.updateTable()
        } else {
          alert('При изменении статуса произошла ошибка')
        }
      })
    } else {
      alert('Выбран неверный статус')
    }
  }

  render() {
		return(
			<div>
				<Modal show={this.props.modalOpened} onHide={this.onCloseModal}>
		      <Modal.Header className='login-modal-wrap' closeButton>
		        <Modal.Title>Вынести решение по статье</Modal.Title>
		      </Modal.Header>
		      <Modal.Body className='login-modal'>
            <DropdownButton
              id='status'
              bsStyle='warning'
              title={this.state.status}
              onSelect={this.statusSelect}
              style={{width: '250px', marginBottom: '1vh'}}
            >
              <MenuItem eventKey={'Одобрено'}>
                Одобрено
              </MenuItem>
              <MenuItem eventKey={'Условно одобрено'}>
                Условно одобрено
              </MenuItem>
              <MenuItem eventKey={'Отклонено'}>
                Отклонено
              </MenuItem>
            </DropdownButton>
            { this.selectionResult() }
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

export default connect(mapStateToProps)(PublicationEditorialModal)