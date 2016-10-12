import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'
import Divider from 'material-ui/Divider'
import { PassportForm as UIPassportForm } from 'passport-service-gui'

class PassportForm extends Component {
  
  render() {

    const settings = this.context.settings
    const styles = settings.styles

    const LoginMessage = settings.loginMessage
    const RegisterMessage = settings.registerMessage

    const pageContent = {
      login:<LoginMessage />,
      register:<RegisterMessage />
    }

    return (

      <div style={styles.paddedContent}>
        <Paper zDepth={2}>
          <UIPassportForm 
            styles={{
              formwrapper:styles.wrapper
            }}
            page={this.props.page}
            changePage={this.props.changePage}
            onLogin={this.props.onLogin}
            onRegister={this.props.onRegister}
            pageContent={pageContent}
            url={this.props.url} />
        </Paper>
      </div>

    )
  }

}

PassportForm.contextTypes = {
  settings: React.PropTypes.object
}

export default PassportForm