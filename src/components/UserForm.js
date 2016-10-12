import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import { UserForm as UIUserForm } from 'passport-service-gui'
import { layout, passportForms } from '../styles'

class UserForm extends Component {
  
  render() {

    const settings = this.context.settings
    const styles = settings.styles

    return (

      <div style={styles.paddedContent}>
        <Paper zDepth={2}>
          <UIUserForm 
            styles={{
              formwrapper:styles.wrapper
            }}
            onUpdate={this.props.onUpdate}
            url={this.props.url}>

            {this.props.children}

          </UIUserForm>
        </Paper>
      </div>

    )
  }

}

UserForm.contextTypes = {
  settings: React.PropTypes.object
}

export default UserForm