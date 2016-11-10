import { routerActions } from 'react-router-redux'

import {
  status
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

export const getPassportStatus = (url) => {
  return status(url || '/auth/v1' + constants.statusUrl)
}