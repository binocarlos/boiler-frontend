import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools, actions } from 'passport-service-gui'
import {
  EMAIL_FIELD
} from 'passport-service-gui/lib/schema'

import constants from '../constants'
import UIUserForm from '../components/UserForm'

export class UserForm extends Component {
  render() {

    const settings = this.context.settings
    const schema = [{
      name:'email',
      type:'text',
      readonly:true
    }].concat(settings.userDetailsSchema)

    const props = {
      url:settings.passportUrl + constants.detailsUrl,
      schema,
      ...this.props
    }

    return (
      <UIUserForm {...props} />
    )
  }
}

UserForm.contextTypes = {
  settings: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {

  const postLogin = (err) => {

    if(err) return

    // clear existing passport state
    dispatch(actions.resetStatus())

    // redirect to '/dashboard'
    dispatch(routerActions.push(constants.dashboardPath))
  }

  return {
    onUpdate:(err, body, opts) => {
      if(err) return

      alert('user form updated - put a snackbar in containers/UserForm.js')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)
