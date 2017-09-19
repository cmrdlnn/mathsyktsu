import React, { Component } from 'react'
import { Button, ControlLabel, FormGroup, FormControl, Panel } from 'react-bootstrap'

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	open: false
    }
  }

  openMessage = () => {
  	this.setState({
  		open: !this.state.open
  	})
  }

  render() {
	  return(
		  <div className='lkmain'>
		  	<div style={{overflow: 'hidden'}}>
			    <h3 style={{float: 'left'}}>
			    	Сообщения
			    </h3>
		    	<Button bsStyle="warning" style={{float: 'right'}} onClick={ this.openMessage }>Написать</Button>
			  </div>
			  <Panel collapsible expanded={this.state.open}>
			  	<FormGroup>
			    	<ControlLabel>Получатель:</ControlLabel>
			    	<FormControl componentClass="select" placeholder="Получатель...">
			      	<option value="other">...</option>
			    	</FormControl>
			  	</FormGroup>
			  	<FormGroup>
		      	<ControlLabel>Сообщение:</ControlLabel>
		      	<FormControl componentClass="textarea" placeholder="Введите Ваше сообщение" />
		    	</FormGroup>
			  </Panel>
			  <Panel header={<h3>Ваши сообщения</h3>} bsStyle="warning">
			    В данный момент вы не имеете переписки с какими-либо пользователями
			  </Panel>
			</div>
		)
  }
}

export default Messages