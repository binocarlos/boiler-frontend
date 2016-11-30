import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../src/templates/openaccess'

App({
  mountElement:document.getElementById('mount')
})