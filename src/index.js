import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { passportreducer } from 'passport-service-gui'
import boilerReducer from './reducer'

import Routes from './routes'
import { SettingsFactory, SettingsProvider } from './settings'

const boilerapp = (opts = {}) => {

  const settings = SettingsFactory(opts)

  const middleware = [
    thunk,
    routerMiddleware(hashHistory)
  ].concat(settings.middleware)

  const finalCreateStore = compose(
    applyMiddleware.apply(null, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)

  const reducer = combineReducers({
    passport: passportreducer,
    routing: routerReducer,
    boiler: boilerReducer,
    ...settings.reducers
  })

  const store = finalCreateStore(reducer)
  const history = syncHistoryWithStore(hashHistory, store)

  injectTapEventPlugin()

  ReactDOM.render(  
    <Provider store={store}>
      <SettingsProvider settings={settings}>
        <MuiThemeProvider>
          <Router history={history}>
            {Routes(store, settings)}
          </Router>
        </MuiThemeProvider>
      </SettingsProvider>
    </Provider>,
    opts.mountElement ? opts.mountElement : documemnt.getElementById(opts.mountId)
  )
}

export default boilerapp