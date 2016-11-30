import React, { Component, PropTypes } from 'react'

import AppBar from './containers/AppBar'

import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import Help from './components/Help'
import LoginMessage from './components/LoginMessage'
import RegisterMessage from './components/RegisterMessage'


import STYLES from './styles'

const SETTINGS = {
  middleware:[],
  reducers:{},
  sagas:[],
  appbar:AppBar,
  welcome:Welcome,
  dashboard:Dashboard,
  help:Help,
  getUser:(state) => null,
  getRoutes:(auth) => [],
  getTitle:(state, user) => 'MyApp',
  getMenu:null
}

// merge the settings with the defaults
const SettingsFactory = (settings = {}) => {
  if(!settings.mountElement && !settings.mountId) throw new Error('mountElement or mountId option required')
  return Object.assign({}, SETTINGS, settings)
}

export default SettingsFactory