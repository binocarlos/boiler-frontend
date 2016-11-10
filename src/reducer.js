import update from 'react/lib/update'
import {
  BOILER_USER_DETAILS_MESSAGE,
  BOILER_TOGGLE_MENU
} from './actions'

const DEFAULT_STATE = {
  currentPage: {
    path: null,
    requireUser: null
  },
  // controls the snackbar on the user details page
  userDetailsMessage:null,
  // controls the menu drawer inside of AuthWrapper -> AppBar
  isMenuOpen:false
}

export default function boilerreducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {

    case BOILER_USER_DETAILS_MESSAGE:

      return update(state, {
        userDetailsMessage:{
          $set:action.message
        }
      })

    case BOILER_TOGGLE_MENU:

      return update(state, {
        isMenuOpen:{
          $set:action.open
        }
      })
      
    default:
      return state
  }
}