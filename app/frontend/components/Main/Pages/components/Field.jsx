import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormControl } from 'react-bootstrap'
import Alerted from '../../../../common/Alerted'
import { encodeFile } from '../../../../utils'

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
      fileTitle: '',
      file: null
    }
  }

  selectFile = (result) => {
    this.setState({ message: null })
    if (result) {
      this.setState({
        fileTitle: result.name,
        file: {
          content: result.content,
          mime_type: result.type
        }
      })
    } else {
      this.setState({ fileTitle: '', file: null })
    }
  }

  render() {
    const { title, inputStyle, labelStyle } = this.props,
      { message, fileTitle } = this.state,
      variationProps = ['type', 'placeholder', 'componentClass'].reduce(
        (result, prop) => {
          if (this.props[prop]) result[prop] = this.props[prop]
          return result
        }
      , {})

    let styleOfInput = { marginBottom: '2vh' }
    if (inputStyle) styleOfInput = { ...styleOfInput, ...inputStyle }

    return(
      <div>
        <ControlLabel style={labelStyle || { marginTop: '2vh' }}>
          { title }
        </ControlLabel>
        { variationProps.type == 'file' ? (
          <div
            className="fileform"
            style={labelStyle || { margin: '0 0 2vh' }}
          >
            <div className="fileformlabel">{ fileTitle }</div>
            <div className="selectbutton">Обзор</div>
            <input
              className="upload"
              type="file"
              onChange={e => encodeFile(e, this.selectFile)}
            />
          </div>
        ) : (
          <FormControl
            inputRef={input => this.field = input}
            style={styleOfInput}
            onChange={() => this.setState({titleMessage: null})}
            {...variationProps}
          />
        )}
        { Alerted(message) }
      </div>
    )
  }
}

Field.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  componentClass: PropTypes.string
}

Field.defaultProps = {
  type: null,
  placeholder: null,
  inputStyle: null,
  labelStyle: null,
  componentClass: null
}

export default Field