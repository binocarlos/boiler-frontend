import { passporttools } from 'passport-service-gui'
import constants from './constants'

import {
  path_loaded
} from './actions'

export default (store, settings = {}) => {

  const getUserState = () => {
    return passporttools.getUser(store.getState())
  }

  // a route that requires the user to be logged in
  // redirect to /login if not
  const requireUser = (nextState, replace, callback) => {
    const passport = getUserState()
    let redirected = false

    // redirect to '/login' if there is no user
    if (passport.loaded && !passport.loggedIn) {
      replace({
        pathname: constants.loginPath
      })
      redirected = true
    }
    callback()
    return redirected
  }

  // a route that requires the user to not be logged in
  // redirect to / if they are
  const requireGuest = (nextState, replace, callback) => {
    const passport = getUserState()
    let redirected = false

    // redirect to '/dashboard' if there is a user
    if (passport.loaded && passport.loggedIn) {
      replace({
        pathname: constants.dashboardPath
      })
      redirected = true
    }
    callback()
    return redirected
  }

  return {
    status:getUserState,
    user:requireUser,
    guest:requireGuest
  }
}