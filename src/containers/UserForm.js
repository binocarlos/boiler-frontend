import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools, actions } from 'passport-service-gui'
import constants from '../constants'
import UIUserForm from '../components/UserForm'

export class UserForm extends Component {
  render() {

    const settings = this.context.settings

    const props = {
      url:settings.passportUrl + constants.detailsUrl,
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

      console.log('-------------------------------------------');
      console.log('user details saved')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)
