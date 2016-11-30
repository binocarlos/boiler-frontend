boiler-frontend
===============

The frontend redux application for [boiler-stack](https://github.com/binocarlos/boiler-stack)

## install

Install the module to your project:

```
$ npm install boiler-frontend --save
```

## Options

 
 * reducers - an object of reducers to be passed into `combineReducers`
 * sagas - an array of sagas to be passed into `sagaMiddleware.run`
 * middleware - an array of middleware to be passed into `applyMiddleware`
 * openAccess - no user-login
 * getUser(state) - a function that will return the user given the state (or null if not logged in)
 * getRoutes(auth) - a function that returns react-router routes for the ap
 * getTitle(user, state) - a function that returns the app title
 * getMenu(user, state, onClick) - return React elements that will appear in a drawer
   * onClick(location) - a function to handle updating the location
 * React/Redux components - these can be overriden
   * appbar - the appbar
   * welcome - the welcome page
   * dashboard - the dashboard page
   * help - the help page

## Templates

There are various template applications that use the base factory options above

#### OpenAccess

An app that can be viewed by anyone with no login/register.

#### Passport

Use [passport-slim-ui](https://github.com/binocarlos/passport-slim-ui) to do login and register.

 * passportUrl - the backend URL for the `passport-slim` api

Things to plug in later:

 * userDetailsSchema - a [biro](https://github.com/binocarlos/biro) schema for the user details form

* React/Redux components - these can be overriden
   * loginMessage - display below the login form
   * registerMessage - display below the register form

## license

MIT