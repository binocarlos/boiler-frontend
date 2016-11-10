boiler-frontend
===============

The frontend redux application for [boiler-stack](https://github.com/binocarlos/boiler-stack)

## install

Install the module to your project:

```
$ npm install boiler-frontend --save
```

## usage

```javascript
import boilerapp from 'boiler-frontend'
import * as reducers from './reducers'

import MyPage from './MyPage'
import MyWrapper from './MyWrapper'
import MyOtherPage from './MyOtherPage'

boilerapp({
  mountElement:document.getElementById('mount'),
  reducers:reducers,
  routes:[{
    path:'/mything',
    component:MyPage
  },{
    component:MyWrapper,
    routes:[{
      path:'/myotherthing',
      component:MyOtherPage
    }]
  }]
})
```

## Options

 * styles - an object of overriden styles
 * getRoutes - a function that returns react-router routes for the ap
 * reducers - an object of reducers to be passed into `combineReducers`
 * middleware - an array of middleware to be passed into `applyMiddleware`
 * passportUrl - the backend URL for the `passport-service` api
 * guestTitle - the appbar title when not logged in
 * userFilter(user) - a function that decides if the user is allowed (return true or false)
 * appTitle - the appbar title when logged in
 * userDetailsSchema - a [biro](https://github.com/binocarlos/biro) schema for the user details form
 * getMenuChildren(context) - return React elements that will appear in a drawer
 * React/Redux components
   * appbar - the appbar
   * loader - the loading spinner
   * welcome - the welcome page
   * dashboard - the dashboard page
   * help - the help page
   * loginMessage - display below the login form
   * registerMessage - display below the register form

#### `styles`

You can override the styles used for the layout of components by passing an object here.

The styles are merged with the [default styles](src/styles.js)

#### `getRoutes(auth)`

A function that will return the react-router routes for the various parts of the application.

You can use `auth.user` and `auth.guest` as the `onEnter` value for the routes in-order to apply authentication requirements.

```
import { Route, IndexRoute } from 'react-router'
import Hello from './Hello'

boilerapp({
  getRoutes:(auth) => {
    return (
      <Route>
        <Route path="hello" component={Hello} onEnter={auth.user} />
        <Route path="hello2" component={Hello} onEnter={auth.guest} />
      </Route>
    )
  }
})
```

#### `reducers`

Inject your reducers into application using this object

The `reducers` option should be an object and is merged as follows:

```javascript
const reducer = combineReducers({
  passport: passportreducer,
  routing: routerReducer,
  ...settings.reducers
})
```

#### `middleware`

Inject your middleware into application using this array

The `middleware` option should be an array and is merged as follows:

```javascript
const middleware = [
  thunk,
  routerMiddleware(hashHistory)
].concat(settings.middleware)

const finalCreateStore = compose(
  applyMiddleware.apply(null, middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
```

## license

MIT