import React, { Component } from 'react'
import { Button, Panel, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import Alerted from '../../../../../common/Alerted.jsx'
import { ajaxRequestToServer } from '../../../../../api'

class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	open: false,
    	label: '',
  		error: '',
  		file: null,
  		alert_style: 'danger',
  		publications: null
    }
  }

  openUploader = () => {
  	this.setState({
  		open: !this.state.open,
  		label: ''
  	})
  }

  componentWillMount() {
  	ajaxRequestToServer('/publications/show', {}, 'post', {'Authorization': 'Bearer '+this.props.token})
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
    ajaxRequestToServer('/publications/show', {}, 'post', {'Authorization': 'Bearer '+this.props.token})
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

	selectFile = () => {
		if (this.refs.file.files[0]) {
			const file = this.refs.file.files[0]
			if (file.type == 'application/x-tex' || file.type == 'text/x-tex') {
				const { name: filename, size, type: mime_type } = file
        new Promise((resolve) => {
          const fr = new FileReader()
          fr.addEventListener('load', () => {
            resolve({
              filename,
              size,
              mime_type,
              content: fr.result
            });
          });
          fr.readAsDataURL(file);
        }).then((result) => {
			this.setState({
				label: file.name,
				error: '',
				file: result
			})
        })
			} else {
				this.setState({
					label: '',
					error: 'Неверный формат файла',
					file: null,
					alert_style: 'danger'
				})
			}
		} else {
			this.setState({
				label: '',
				error: '',
				file: null
			})
		}
	}

  submit = () => {
  	const file = this.state.file
  	if (file != null) {
  		ajaxRequestToServer('/publications/create', { publication: file }, 'post', {'Authorization': 'Bearer '+this.props.token})
  		.then(response => {
  			if (response.status == 201) {
					this.setState({
						error: 'Файл статьи успешно загружен',
						file: null,
						alert_style: 'success',
						label: ''
					})
					ajaxRequestToServer('/publications/show', {}, 'post', {'Authorization': 'Bearer '+this.props.token})
			  	.then(response => {
			  		if (response.status == 200) {
				      response.json().then(data => {
					      this.setState({
					      	publications: data
					      })
				      })
			    	}
			    })
  			} else {
  				this.setState({
					error: 'Ошибка загрузки файла',
					label: '',
					file: null,
					alert_style: 'danger'
				})
  			}
  		})
  	} else {
  		this.setState({
				error: 'Не выбран файл для отправки',
				alert_style: 'danger'
			})
  	}
  }

  showPublications = () => {
  	const pub = this.state.publications
  	var rows = [];
  	for (var i = 0; i < pub.length; i++) {
  	  rows.push(
  	  	<tr key={i}>
  	  		<td>{i+1}</td> 
  	  		<td>{pub[i].filename}</td>
  	  		<td>{pub[i].size}</td>
  	  		<td>{pub[i].created_at}</td>
  	  		<td>{pub[i].status}</td>
  	  	</tr>
  	  )
  	}
  	return (
  		<table className='table table-inverse' style={{marginBottom: '0'}}>
		  	<thead>
		  		<tr className='bg-danger' style={{backgroundColor: 'antiquewhite', fontWeight: 'bold'}}>
		  			<td>#</td>
			  		<td>Имя файла</td>
			  		<td>Размер</td>
			  		<td>Отправлен</td>
			  		<td>Статус</td>
		  		</tr>
		  	</thead>
		  	<tbody>
			  	{rows}
			  </tbody>
		  </table>
  	)
  }

  render() {
		return(
			<div className='lkmain'>
				<div style={{overflow: 'hidden', marginBottom: '1vh'}}>
			    <h3 style={{float: 'left'}}>
			    	Публикации
			    </h3>
		    	<Button bsStyle="warning" style={{float: 'right'}} onClick={ this.openUploader }>Подать статью</Button>
			  </div>
			  <Panel collapsible expanded={this.state.open} style={{marginBottom: '1vh'}}>
					Загрузить из файла:
					<form>
						<div className="fileform">
							<div className="fileformlabel">{ this.state.label }</div>
							<div className="selectbutton">Обзор</div>
							<input ref='file' className='upload' type="file" accept="application/x-tex" onChange={ this.selectFile }/>
						</div>
						<p style={{marginBottom: '1vh', marginTop: '1vh'}}>
							Файл статьи в формате .tex
						</p>
						{ Alerted(this.state.error, this.state.error == '', this.state.alert_style) }
						<Button bsStyle="warning" onClick={ this.submit }>Отправить</Button>
					</form>
			  </Panel>
			  <Panel header={<h3>Ваши статьи</h3>} bsStyle="warning">
			  	{ this.state.publications != null ? 
			  		this.showPublications() : 
			  		(<h3 style={{margin: '1vh', textAlign: 'center'}}>В данный момент Вы не подали ни одной статьи</h3>) }
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

export default connect(mapStateToProps)(Publications)