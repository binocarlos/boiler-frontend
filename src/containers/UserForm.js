import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools, actions } from 'passport-service-gui'
import {
  EMAIL_FIELD
} from 'passport-service-gui/lib/schema'

import {
  user_details_message
} from '../actions'

import constants from '../constants'
import UserForm from '../components/UserForm'

export class UserFormContainer extends Component {
  render() {

    const settings = this.context.settings
    const schema = [].concat(settings.userDetailsSchema)

    const props = {
      url:settings.passportUrl + constants.detailsUrl,
      schema,
      ...this.props
    }

    return (
      <UserForm {...props} />
    )
  }
}

UserFormContainer.contextTypes = {
  settings: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    message:state.boiler.userDetailsMessage
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  
  return {
    onUpdate:(err, body, opts) => {
      if(err) return

      dispatch(user_details_message('user details saved'))
    },
    onCloseMessage:() => {
      dispatch(user_details_message())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFormContainer)
