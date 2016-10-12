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
 * routes - an array of objects describing the routes for `react-router`
 * reducers - an object of reducers to be passed into `combineReducers`
 * middleware - an array of middleware to be passed into `applyMiddleware`
 * passportUrl - the backend URL for the `passport-service` api
 * guestTitle - the appbar title when not logged in
 * appTitle - the appbar title when logged in
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

#### `routes`

An array of objects that will be turned into `react-router` routes for the application.

Each route object has the following properties:

 * path
 * component
 * onEnter
 * openAccess - allow either guests or logged-in users
 * forceGuest - require a non logged-in user
 * routes - an array of child route info
 * ... - all other properties are passed to the `<Route />`

Each route is also assigned an `onEnter` function to handle authentication.

The default action is to required a logged in user.  To specify a route that does not need to be logged in - use the `guest` property of the route:

```javascript
boilerapp({
  ...,
  routes:[{
    path:'/mything',
    component:MyPage,
    // this route does not require a logged in user
    forceGuest:true
  },{
    path:'/about',
    component:MyPage,
    // this route does not require a logged in user
    openAccess:true
  }]
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