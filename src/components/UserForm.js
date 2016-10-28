import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { UserForm as UIUserForm } from 'passport-service-gui'
import { layout, passportForms } from '../styles'

const SNACKBAR_AUTOHIDE = 5000

class UserForm extends Component {
  
  render() {

    const settings = this.context.settings
    const styles = settings.styles

    return (

      <div style={styles.paddedContent}>
        <Paper zDepth={2}>
          <div style={Object.assign({}, styles.wrapper, styles.detailsBottom)}>
            <UIUserForm 
              onUpdate={this.props.onUpdate}
              schema={this.props.schema}
              url={this.props.url}>

              {this.props.children}

            </UIUserForm>
          </div>
        </Paper>
        {
          this.props.message ? 
            (
              <Snackbar 
                open={true}
                message={this.props.message}
                autoHideDuration={SNACKBAR_AUTOHIDE}
                onRequestClose={this.props.onCloseMessage} />
            ) : null
        }
      </div>

    )
  }

}

UserForm.contextTypes = {
  settings: React.PropTypes.object
}

export default UserForm