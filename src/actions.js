import { routerActions } from 'react-router-redux'
import constants from './constants'

export const BOILER_USER_DETAILS_MESSAGE = 'BOILER_USER_DETAILS_MESSAGE'

export const user_details_message = (message = null) => {
  return {
    type: BOILER_USER_DETAILS_MESSAGE,
    message
  }
}

export const user_loaded = (data = {}) => {
  return (dispatch, getState) => {

    
    // refresh the router here
  }
}