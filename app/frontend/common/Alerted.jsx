import React from 'react'
import { Alert, Panel } from 'react-bootstrap'

const Alerted = (message, occasion = true, alert_style='danger') => {
  return (
    <Panel collapsible expanded={message || !occasion}>
      <Alert bsStyle={alert_style}>
        { message }
      </Alert>
    </Panel>
  )
}

export default Alerted