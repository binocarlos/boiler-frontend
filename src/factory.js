import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import boilerReducer from './reducer'
import Routes from './routes'
import SettingsFactory from './settings'
import Sagas from './sagas'

const boilerapp = (settings = {}) => {

  settings = SettingsFactory(settings)

  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    sagaMiddleware,
    routerMiddleware(hashHistory)
  ].concat(settings.middleware)

  const finalCreateStore = compose(
    applyMiddleware.apply(null, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)

  const reducer = combineReducers({
    routing: routerReducer,
    boiler: boilerReducer,
    ...settings.reducers
  })

  const store = finalCreateStore(reducer)
  const history = syncHistoryWithStore(hashHistory, store)
  
  sagaMiddleware.run(Sagas(settings.sagas))
  injectTapEventPlugin()

  ReactDOM.render(  
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          {Routes(store, settings)}
        </Router>
      </MuiThemeProvider>
    </Provider>,
    settings.mountElement ? settings.mountElement : documemnt.getElementById(settings.mountId)
  )
}

export default boilerapp