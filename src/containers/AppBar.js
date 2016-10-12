import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools, actions } from 'passport-service-gui'
import constants from '../constants'
import UIAppBar from '../components/AppBar'

export class AppBar extends Component {
  render() {

    const settings = this.context.settings

    let title = this.props.passport.loggedIn ? settings.appTitle : settings.guestTitle
    title = this.props.passport.loaded ? title : ''

    let props = {
      logout:() => {
        this.props.doLogout(settings.passportUrl + '/logout')
      },
      title,
      ...this.props
    }

    return (
      <UIAppBar {...props} />
    )
  }
}

AppBar.contextTypes = {
  settings: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {  
    passport:passporttools.getUser(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeLocation:(path) => {
      dispatch(routerActions.push(path))
    },
    doLogout:(url) => {
      // ping the logout endpoint
      dispatch(actions.logout(url, (err, body, opts) => {
        // clear existing passport state
        dispatch(actions.resetStatus())

        // redirect to '/'
        dispatch(routerActions.push(constants.loginPath))
      }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar)
