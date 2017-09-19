import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const FieldGroup = ({ label, help, validation={}, inputRef={}, ...props }) => ( 
  <FormGroup validationState={validation}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl inputRef={inputRef} {...props} />
    <FormControl.Feedback/>
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
)

export default FieldGroup