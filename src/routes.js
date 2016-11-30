import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import AppWrapper from './components/AppWrapper'

export default (store, settings = {}) => {

/*
  const auth = PassportAuth(store, settings)
  const routes = settings.getRoutes ? settings.getRoutes(auth) : null
  const passportRoutes = PassportRoutes({
    loginRoute:settings.loginRoute,
    registerRoute:settings.registerRoute,
    loginMessage:settings.loginMessage,
    registerMessage:settings.registerMessage
  })
*/
  //onEnter={auth.ensureUser('/login')}
  return (
    <Route path="/" component={AppWrapper} settings={settings}>
      <IndexRoute component={settings.welcome}  />
    </Route>
  )
}