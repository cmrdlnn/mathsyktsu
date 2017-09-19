import React from 'react'

function UnavailablePage() {
  return (
    <div className="main-content">
      <p className="caption">
        Страница недоступна
      </p>
      <div className="main-description">
        <h2 style={{textAlign: 'center'}}>{ this.props.message }</h2>
      </div>
    </div>
  )
}

export default UnavailablePage