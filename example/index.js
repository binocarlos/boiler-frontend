import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import boilerapp from '../src/index'
import TestPage from './TestPage'

boilerapp({
  mountElement:document.getElementById('mount'),
  getRoutes:(auth) => {
    return (
      <Route>
        <Route path="test" component={TestPage} onEnter={auth.guest} />
        <Route path="test2" component={TestPage} onEnter={auth.guest} />
      </Route>
    )
  }
})