import React, { Component, PropTypes } from 'react'

import Welcome from './containers/Welcome'
import Dashboard from './containers/Dashboard'
import Help from './containers/Help'
import AppBar from './containers/AppBar'

import Loader from './components/Loader'
import LoginMessage from './components/LoginMessage'
import RegisterMessage from './components/RegisterMessage'

import STYLES from './styles'

const SETTINGS = {
  styles:{},
  passportUrl:'/auth/v1',
  middleware:[],
  reducers:{},
  userDetailsSchema:[],
  appbar:AppBar,
  loader:Loader,
  welcome:Welcome,
  dashboard:Dashboard,
  help:Help,
  loginMessage:LoginMessage,
  registerMessage:RegisterMessage,
  guestTitle:'Login / Register',
  appTitle:'App Title'
}

// merge the settings with the defaults
export const SettingsFactory = (settings = {}) => {
  settings = Object.assign({}, SETTINGS, settings)
  settings.styles = Object.assign({}, STYLES, settings.styles)
  return settings
}

// provide the settings down the tree
export class SettingsProvider extends React.Component {
  getChildContext() {
    return {
      settings: this.props.settings || {}
    }
  }

  render() {
    return this.props.children
  }
}

SettingsProvider.childContextTypes = {
  settings: React.PropTypes.object
}