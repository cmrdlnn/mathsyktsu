import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import PersonalAreaContent from './PersonalAreaContent'

class PersonalArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 1
    }
  }

  handleSelect = (e) => {
    this.setState({ selectedTab: e })
  }

  render() {
    return (
      <div className="main-content">
        <p className="caption">
          Личный кабинет
        </p>
        <div className="main-description">  
          <img className="personal-photo" src="images/NoPhoto.png" alt="Аватар" />
          <Nav bsStyle="tabs" justified activeKey={this.state.selectedTab} onSelect={this.handleSelect}>
            <NavItem eventKey={1}>Главная</NavItem>
            <NavItem eventKey={2}>Публикации</NavItem>
            <NavItem eventKey={3}>Cообщения</NavItem>
            <NavItem eventKey={4}>Настройки</NavItem>
          </Nav>
          <PersonalAreaContent selectedTab={this.state.selectedTab} />
        </div>
      </div>
    )
  }
}

export default PersonalArea