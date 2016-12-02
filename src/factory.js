import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { combineReducers } from 'redux'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import SettingsFactory from './settings'
import boilerReducer from './reducer'
import Routes from './routes'
import Store from './store'

import Sagas from './sagas'

import Root from './containers/Root'

const boilerapp = (settings = {}) => {

  settings = SettingsFactory(settings)

  const rootReducer = combineReducers({
    routing: routerReducer,
    boiler: boilerReducer,
    ...settings.reducers
  })

  const middleware = [
    routerMiddleware(hashHistory)
  ].concat(settings.middleware)

  const store = Store(rootReducer, middleware, window.__INITIAL_STATE__)
  const history = syncHistoryWithStore(hashHistory, store)
  const routes = Routes(store, settings)
  
  store.runSaga(Sagas(settings.sagas))
  injectTapEventPlugin()

  render(

    <Root
      store={store}
      history={history}
      routes={routes} />,
   
    settings.mountElement ? settings.mountElement : documemnt.getElementById(settings.mountId)
  )
}

export default boilerapp