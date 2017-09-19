import React from 'react'
import { Alert, Panel } from 'react-bootstrap'

const Alerted = (message, occasion, alert_style='danger') => {
  return (
    <Panel collapsible expanded={!occasion}>
      <Alert bsStyle={alert_style}>
        { message }
      </Alert>
    </Panel>
  )
}

export default Alerted