import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainContent from './Content/MainContent.jsx'
import MainContentRedactor from './Content/MainContentRedactor.jsx'
import Publications from './Content/Publications.jsx'
import PublicationsRedactor from './Content/PublicationsRedactor.jsx'
import Messages from './Content/Messages.jsx'
import Settings from './Content/Settings.jsx'
import MainContentEditorial from './Content/MainContentEditorial.jsx'
import PublicationsEditorial from './Content/PublicationsEditorial.jsx'

class PersonalAreaContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainContentOpened: true,
			messagesOpened: true
		}
	}

	render() {
		switch (this.props.selectedTab) {
			case 1: {
				if (this.props.role == 'redactor') {
					return(
						<MainContentRedactor />
					)
				} else if (this.props.role == 'editorial_board') {
					return(
						<MainContentEditorial />
					)
				} else {
					return(
						<MainContent />
					)
				}
			}
			case 2: {
				if (this.props.role == 'redactor') {
					return(
						<PublicationsRedactor />
					)
				} else if (this.props.role == 'editorial_board') {
					return(
						<PublicationsEditorial/>
					)
				} else {
					return(
						<Publications/>
					)
				}
			}
			case 3: {
				return(
					<Messages messagesOpened={ this.state.messagesOpened }/>
				)
			}
			case 4: {
				return(
					<Settings/>
				)
			}
		}
	}
}

function mapStateToProps (state) {
  return {
    role: state.session.role
  }
}

export default connect(mapStateToProps)(PersonalAreaContent)