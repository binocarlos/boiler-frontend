import { routerActions } from 'react-router-redux'
import constants from './constants'

export const BOILER_PATH_LOADED = 'BOILER_PATH_LOADED'

export const path_loaded = (path, requireUser) => {
  return {
    type: BOILER_PATH_LOADED,
    path,
    requireUser
  }
}

// the /status data has loaded
// we want to re-trigger the Router auth onEnter functions
// so move to a /loading page
// then timeOut before moving back
// we know what path they were on because the onEnter function
// will have recorded it
// (using the action above)
export const user_loaded = (data = {}) => {
  return (dispatch, getState) => {

    let { boiler: { currentPage: { path, requireUser } } } = getState()

    // this means we are where we need to be
    if(data.loggedIn==requireUser) return

    dispatch(routerActions.push(data.loggedIn ? 
      constants.dashboardPath :
      constants.loginPath
    ))
  }
}