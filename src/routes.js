import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import Auth from './auth'

import Wrapper from './containers/Wrapper'
import Page from './components/Page'
import PassportForm from './containers/PassportForm'


export default (store, settings = {}) => {
  
  const auth = Auth(store, settings)
  let routeid = 0

  const createRoute = (route = {}) => {

    let routeProps = Object.assign({}, route)

    routeProps.children = (routeProps.children || []).map(createRoute)

    // on mess with onEnter for routes with a path
    if(routeProps.path && !routeProps.openAccess){

      // the auth function we run for the route
      // default to needing a user - otherwise use `guest` as the flag
      const authOnEnter = routeProps.forceGuest ? auth.guest : auth.user

      // keep a reference to the existing onEnter property of the route
      // we call it after auth function
      const existingOnEnter = routeProps.onEnter

      // the onEnter function for the route
      // it calls the custom onEnter after the given auth function
      routeProps.onEnter = (nextState, replace, callback) => {

        const authCallback = existingOnEnter ? 
          () => {
            existingOnEnter(nextState, replace, callback)
          } : callback

        authOnEnter(nextState, replace, authCallback)

      }
      
    }

    routeProps.key = routeid++

    return (
      <Route {...routeProps} />
    )
  }

  return (
    <Route path="/" component={Wrapper}>
      <Route component={Page}>
        <IndexRoute component={settings.welcome} onEnter={auth.guest} />
        <Route path="dashboard" component={settings.dashboard} onEnter={auth.user} />
        <Route path="help" component={settings.help} onEnter={auth.user} />
      </Route>
      <Route path="login" component={PassportForm} page="login" onEnter={auth.guest} />
      <Route path="register" component={PassportForm} page="register" onEnter={auth.guest} />
      {settings.routes.map(createRoute)}
    </Route>
  )
}