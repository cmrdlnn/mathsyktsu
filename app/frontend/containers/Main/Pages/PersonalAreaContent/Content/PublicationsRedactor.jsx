import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table'
import { Modal } from 'react-bootstrap'
import { ajaxRequestToServer } from '../../../../../api'
import PublicationModal from './PublicationModal.jsx'
import SetEditorialBoardModal from './SetEditorialBoardModal.jsx'


const statusType = {
  'Отправлено редактору': 'Отправлено редактору',
  'На рассмотрении': 'На рассмотрении',
  'Одобрено': 'Одобрено',
  'Условно одобрено': 'Условно одобрено',
  'Отклонено': 'Отклонено'
}

class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {
  		publications: null,
  		pubModalOpen: false,
  		editorialBoardModalOpen: false,
  		selectedRows: [],
  		viewedPublication: null
    }
  }

  componentWillMount() {
  	ajaxRequestToServer('/publications/show_for_redactor', {}, 'post', {'Authorization': 'Bearer '+this.props.token})
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
    ajaxRequestToServer('/publications/show_for_redactor', {}, 'post', {'Authorization': 'Bearer '+this.props.token})
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

  openPubModal = (id) => {
    this.setState({
    	viewedPublication: id,
    	pubModalOpen: true 
    })
  }

  closePubModal = () => {
    this.setState({ 
    	pubModalOpen: false,
    	viewedPublication: null
    })
  }

  openEditorialBoardModal = () => {
  	const pubs = this.refs.publications_table.state.selectedRowKeys
  	if (pubs.length != 0) {
	    this.setState({ 
	    	selectedRows: pubs,
	    	editorialBoardModalOpen: true 
	    })
	  } else {
	  	alert('Вы не выбрали ни одной статьи')
	  }
  }

  closeEditorialBoardModal = () => {
    this.setState({ editorialBoardModalOpen: false })
  }

	createAppointBtn = (onClick) => {
	  return (
	    <ExportCSVButton
	      btnText='Назначить на проверку'
	      btnContextual='btn-success'
	      btnGlyphicon='glyphicon-edit'
	      onClick={ () => this.openEditorialBoardModal() }
	    />
	  )
	}

	onAfterDeleteRow = (rows) => {
		ajaxRequestToServer('/publications/delete_by_redactor', {publication: rows}, 'delete', {'Authorization': 'Bearer '+this.props.token})
		.then(response => {
			if (response.status != 204) {
				alert('Не удалось удалить статьи')
			}
		})
	}

  render() {
  	const selectRow = {
      mode: 'checkbox',
      bgColor: 'rgb(219, 155, 52)',
      clickToSelect: true
    }

  	const options = {
	  	noDataText: 'Статьи отсутствуют',
	  	exportCSVBtn: this.createAppointBtn,
	  	afterDeleteRow: this.onAfterDeleteRow,
	  	deleteText: 'Удалить',
	  	onRowDoubleClick: (row) => { this.openPubModal(row.id) },
      defaultSortName: 'created_at',
      defaultSortOrder: 'desc'
	  }

		return(
			<div style={{margin: '1vh 0'}}>
			  <BootstrapTable
			  	ref='publications_table'
			  	options={ options }
			  	striped
			  	bordered
			  	hover
			  	pagination
			  	exportCSV
			  	deleteRow
			  	selectRow={ selectRow }
			  	data={this.state.publications}
			  	tableStyle={ { border: '2px solid burlywood' } }
			  	headerStyle={ { backgroundColor: 'beige' } }
			  >
					<TableHeaderColumn dataField="id" width="30" isKey={true}>ID</TableHeaderColumn>
			    <TableHeaderColumn dataField="filename" filter={ { type: 'TextFilter', placeholder: "Введите имя файла" } }>Имя файла</TableHeaderColumn>
			    <TableHeaderColumn dataField="full_name" filter={ { type: 'TextFilter', placeholder: "Введите автора" } }>Отправитель</TableHeaderColumn>
			    <TableHeaderColumn dataField="created_at" dataSort>Отправлен</TableHeaderColumn>
			    <TableHeaderColumn 
				    dataField="status" 
				    filter={ { type: 'SelectFilter', placeholder: "Выберите статус", options: statusType, condition: 'eq' } }
					>
						Статус
					</TableHeaderColumn>
				</BootstrapTable>
				<PublicationModal
					modalOpened={this.state.pubModalOpen}
					onCloseModal={this.closePubModal}
					id={this.state.viewedPublication}
				/>
				<SetEditorialBoardModal
					modalOpened={this.state.editorialBoardModalOpen}
					onCloseModal={this.closeEditorialBoardModal}
					rows={this.state.selectedRows}
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

export default connect(mapStateToProps)(Publications)