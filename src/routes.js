import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import Wrapper from './containers/Wrapper'
import Page from './components/Page'
import PassportForm from './containers/PassportForm'
import UserForm from './containers/UserForm'

import Auth from './auth'

export default (store, settings = {}) => {

  const auth = Auth(store, settings)
  const innerRoutes = settings.getRoutes ? settings.getRoutes(auth) : null

  return (
    <Route path="/" component={Wrapper}>
      <Route component={Page}>
        <IndexRoute component={settings.welcome} onEnter={auth.guest} />
        <Route path="dashboard" component={settings.dashboard} onEnter={auth.user} />
        <Route path="accountdetails" component={UserForm} page="register" onEnter={auth.user} />
        <Route path="help" component={settings.help} onEnter={auth.user} />
      </Route>
      <Route path="login" component={PassportForm} page="login" onEnter={auth.guest} />
      <Route path="register" component={PassportForm} page="register" onEnter={auth.guest} />
      <Route path="loading" component={settings.loader} />
      {innerRoutes}
    </Route>
  )
}