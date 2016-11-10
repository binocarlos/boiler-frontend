import superagent from 'superagent'
import { routerActions } from 'react-router-redux'

import {
  PASSPORT_STATUS_RESPONSE,
  details
} from 'passport-service-gui/lib/actions'

import constants from './constants'

export const BOILER_USER_DETAILS_MESSAGE = 'BOILER_USER_DETAILS_MESSAGE'

export const user_details_message = (message = null) => {
  return {
    type: BOILER_USER_DETAILS_MESSAGE,
    message
  }
}
export const BOILER_TOGGLE_MENU = 'BOILER_TOGGLE_MENU'

export const toggle_menu = (open = true) => {
  return {
    type: BOILER_TOGGLE_MENU,
    open
  }
}

/*

  we manually refresh the user status otherwise
  the 'loading' false causes flickers in the UI
  
*/
export const refreshUserStatus = (done) => {
  return (dispatch, getState) => {
    superagent
      .get('/auth/v1' + constants.statusUrl)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(res.status<500){
          dispatch({
            type: PASSPORT_STATUS_RESPONSE,
            data: res.body
          })
          done && done(null, res.body)
        }
      })
  }
}

export const updateUserData = (data, done) => {
  return (dispatch, getState) => {
    dispatch(details({
      url:'/auth/v1' + constants.detailsUrl,
      data
    }, (err) => {
      if(err) return done(err)
      dispatch(refreshUserStatus(done))
    }))
  }
  
}