import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Divider from 'material-ui/Divider'
import { passportForms } from '../styles'

class LoginMessage extends Component {
  
  render() {

    const settings = this.context.settings
    const styles = settings.styles

    return (
      <div>
        <Divider />
        <div style={styles.marginTop}>
          <Link to="/register">Click here</Link> to register
        </div>
      </div>
    )
  }

}

LoginMessage.contextTypes = {
  settings: React.PropTypes.object
}

export default LoginMessage