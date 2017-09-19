import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { ajaxRequestToServer } from '../../../../../api'
import PublicationEditorialModal from './PublicationEditorialModal.jsx'
const download = require('downloadjs')

const statusType = {
  'На рассмотрении': 'На рассмотрении',
  'Одобрено': 'Одобрено',
  'Условно одобрено': 'Условно одобрено',
  'Отклонено': 'Отклонено'
}

class PublicationsEditorial extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	publication: null,
    	modalIsOpen: false
    }
  }

  onOpenModal = () => {
  	if (this.state.publication) {
	  	this.setState({
	  		modalIsOpen: true
	  	})
	  } else {
	  	alert('Вы не выбрали публикацию')
	  }
  }

  onCloseModal = () => {
  	this.setState({
  		modalIsOpen: false
  	})
  }

  componentWillMount() {
  	ajaxRequestToServer('/publications/show_for_editorial', {}, 'post', {'Authorization': 'Bearer '+this.props.token})
  	.then(response => {
  		if (response.status == 200) {
	      response.json().then(data => {
		      this.setState({
		      	publications: data
		      })
	      })
    	}
    })
  }

  updateTable = () => {
    ajaxRequestToServer('/publications/show_for_editorial', {}, 'post', {'Authorization': 'Bearer '+this.props.token})
    .then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          this.setState({
            publications: data
          })
        })
      }
    })
  }

  downloadPublication = () => {
  	const id = this.state.publication
  	if (id != null) {
  		ajaxRequestToServer('/publications/download', { publication: { id: id } }
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
  	} else {
  		alert('Вы не выбрали публикацию для скачивания')
  	}
  }

	onRowSelect = (row, isSelected) => {
		if (isSelected) {
		  this.setState({
		  	publication: row.id
		  })
		} else {
			this.setState({
		  	publication: null
		  })
		}
	}

	createCustomButtonGroup = () => {
    return (
      <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
        <button type='button' className='btn btn-warning' onClick={ this.downloadPublication }>
			    Скачать
			  </button>
			  <button type='button' className='btn btn-success' onClick={ this.onOpenModal }>
			    Вынести решение
			  </button>
      </ButtonGroup>
    )
  }


  render() {
  	const selectRow = {
      mode: 'radio',
      bgColor: 'rgb(219, 155, 52)',
      clickToSelect: true,
      onSelect: this.onRowSelect
    }

  	const options = {
	  	noDataText: 'Статьи отсутствуют',
      defaultSortName: 'created_at',
      defaultSortOrder: 'desc',
      btnGroup: this.createCustomButtonGroup
	  }

		return(
			<div style={{margin: '1vh 0'}}>
			  <BootstrapTable
			  	options={ options }
			  	striped
			  	bordered
			  	hover
			  	pagination
			  	selectRow={ selectRow }
			  	data={this.state.publications}
			  	tableStyle={ { border: '2px solid burlywood' } }
			  	headerStyle={ { backgroundColor: 'beige' } }
			  >
					<TableHeaderColumn dataField="id" width="30" isKey={true}>ID</TableHeaderColumn>
			    <TableHeaderColumn dataField="filename" filter={ { type: 'TextFilter', placeholder: "Введите имя файла" } }>Имя файла</TableHeaderColumn>
			    <TableHeaderColumn dataField="size" dataSort>Размер</TableHeaderColumn>
			    <TableHeaderColumn dataField="created_at" dataSort>Отправлен</TableHeaderColumn>
			    <TableHeaderColumn 
				    dataField="status" 
				    filter={ { type: 'SelectFilter', placeholder: "Выберите статус", options: statusType, condition: 'eq' } }
					>
						Статус
					</TableHeaderColumn>
				</BootstrapTable>
				<PublicationEditorialModal
					id={this.state.publication}
					modalOpened={this.state.modalIsOpen}
					onCloseModal={this.onCloseModal}
          updateTable={this.updateTable}
				/>
			</div>
		)
  }
}

function mapStateToProps (state) {
  return {
    token: state.session.token
  }
}

export default connect(mapStateToProps)(PublicationsEditorial)