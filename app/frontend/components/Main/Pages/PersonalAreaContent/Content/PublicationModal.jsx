import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { ajaxRequestToServer } from '../../../../../api'
const download = require('downloadjs')

class PublicationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	publication: null,
      editors: null
    }
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.id != null) {
  		ajaxRequestToServer('/publications/show_details', { publication: { id: nextProps.id} },
  											  'post', { 'Authorization': 'Bearer '+this.props.token })
  		.then(response => {
  			if (response.status == 200) {
	  	    response.json().then(data => {
			      this.setState({
			      	publication: data
			      })
            ajaxRequestToServer('/editorial_board', { editorial_board: { id: nextProps.id} }
                                , 'post', { 'Authorization': 'Bearer '+this.props.token })
            .then(response => {
              if (response.status == 200) {
                response.json().then(editors => {
                  this.setState({
                    editors: editors
                  })
                })
              } else if (response.status == 204) {
                this.setState({
                  editors: null
                })
              } else {
                this.setState({
                  editors: false
                })
              }
            })
	  	    })
    		} else {
    			this.setState({
			    	publication: false
			    })
    		}
    	})
  	} else {
  		this.setState({
				publication: null
			})
  	}
  }

  showPublication = () => {
  	const pub = this.state.publication
  	if (pub == null) {
  		return(<h3>Загрузка...</h3>)
    } else if (pub == false) {
      return(<h3>Ошибка загрузки данных по публикации</h3>)
  	} else {
      let editors = this.state.editors
      if (editors == null) {
        editors = 'не назначены'
      } else if (editors == false) {
        editors = 'ошибка загрузки проверяющих'
      } else {
        editors = editors.join(', ')
      }
  		return(
  			<div style={{marginLeft: '1vw'}}>
  				<b>ID:</b>{ ` ${pub[0].id}` }<br/>
  				<b>Имя файла:</b>{ ` ${pub[0].filename}` }<br/>
  				<b>MIME-тип:</b>{ ` ${pub[0].mime_type}` }<br/>
  				<b>Размер файла:</b>{ ` ${pub[0].size} Б` }<br/>
  				<b>Дата и время отправки:</b>{ ` ${pub[0].created_at}` }<br/>
  				<b>Статус:</b>{ ` ${pub[0].status}` }<br/>
  				<b>Отправитель:</b>{ ` ${pub[0].full_name}` }<br/>
  				<b>EMail отправителя:</b>{ ` ${pub[0].email}` }<br/>
  				<b>Проверяющие:</b>{' '}{ editors }<br/>
  				<p>
            <Button bsStyle="warning" onClick={this.downloadPublication}>Скачать</Button>
          </p>
  			</div>
  		)
  	}
  }

  downloadPublication = () => {
  	const pub = this.state.publication
  	if (pub != null) {
  		ajaxRequestToServer('/publications/download', { publication: { id: pub[0].id} }
  											  , 'post', { 'Authorization': 'Bearer '+this.props.token })
  		.then(response => {
  			if (response.status == 200) {
  				response.json().then(file => {
  					download(file.data, file.filename, file.mime_type)
  				})
  			} else {
  				alert('При скачивании файла произошла ошибка')
  			}
  		})
  	}
  }

  render() {
		return(
			<div>
				<Modal show={this.props.modalOpened} onHide={this.props.onCloseModal}>
		      <Modal.Header className='login-modal-wrap' closeButton>
		        <Modal.Title>Подробности о статье</Modal.Title>
		      </Modal.Header>
		      <Modal.Body className='login-modal'>
		        { this.showPublication() }
		      </Modal.Body>
		      <Modal.Footer className='login-modal-wrap'>
		        <Button bsStyle="warning" onClick={this.props.onCloseModal}>Закрыть</Button>
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

export default connect(mapStateToProps)(PublicationModal)