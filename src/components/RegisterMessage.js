import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Divider from 'material-ui/Divider'
import { passportForms } from '../styles'

class RegisterMessage extends Component {
  
  render() {

    const settings = this.context.settings
    const styles = settings.styles

    return (
      <div style={styles.registerBottom}>
        <Divider />
        <div style={styles.marginTop}>
          Enter your details to register.
        </div>
      </div>
    )
  }

}

RegisterMessage.contextTypes = {
  settings: React.PropTypes.object
}

export default RegisterMessage