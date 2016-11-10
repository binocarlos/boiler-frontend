import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools, actions } from 'passport-service-gui'
import constants from '../constants'
import AppBar from '../components/AppBar'

import {
  toggle_menu
} from '../actions'

export class AppBarContainer extends Component {
  render() {

    const settings = this.context.settings

    let title = this.props.passport.loggedIn ? settings.appTitle : settings.guestTitle
    title = this.props.passport.loaded ? title : ''

    let props = {
      logout:() => {
        this.props.doLogout(settings.passportUrl + '/logout')
      },
      // return the content for the menu drawer
      getMenuChildren:() => {
        return settings.getMenuChildren ?
          settings.getMenuChildren({
            state:this.props.state,
            close:this.props.closeMenu,
            click:this.props.clickMenu
          }) :
          null
      },
      // return extra content for the appbar
      getAppBarChildren:(children) => {
        return settings.getAppBarChildren ?
          settings.getAppBarChildren(children) :
          null
      },
      title,
      ...this.props
    }

    return (
      <AppBar {...props} />
    )
  }
}

AppBarContainer.contextTypes = {
  settings: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {  
    passport:passporttools.getUser(state),
    state:state,
    isMenuOpen:state.boiler.isMenuOpen
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeLocation:(path) => {
      dispatch(routerActions.push(path))
    },
    openMenu:() => {
      dispatch(toggle_menu(true))
    },
    closeMenu:() => {
      dispatch(toggle_menu(false))
    },
    toggleMenu:(open) => {
      dispatch(toggle_menu(open))
    },
    // the user clicked a menu item we should open the url
    clickMenu:(path) => {
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
)(AppBarContainer)
