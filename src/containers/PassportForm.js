import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools, actions } from 'passport-service-gui'
import constants from '../constants'
import UIPassportForm from '../components/PassportForm'

export class PassportForm extends Component {
  render() {

    const settings = this.context.settings

    const props = {
      url:settings.passportUrl,
      ...this.props
    }

    return (
      <UIPassportForm {...props} />
    )
  }
}

PassportForm.contextTypes = {
  settings: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    page:ownProps.route.page
  }
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
    changePage:(path) => {
      // we get synthetic events from the tabs
      if(typeof(path)==='string') dispatch(routerActions.push('/' + path))
    },
    changeLocation:(path) => {
      dispatch(routerActions.push(path))
    },

    // once the user has logged in - first reset the passport state
    // then re-direct to '/' which will trigger the UserLoader
    onLogin: postLogin,

    // once the user has registered
    // perform a login using the same details
    onRegister:(err, body, opts) => {

      if(err) return

      // remap the backend REST url onto /login not /register
      opts = Object.assign({}, opts, {
        url:opts.url.replace(constants.registerPath, constants.loginPath)
      })

      dispatch(actions.login(opts, postLogin))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassportForm)
