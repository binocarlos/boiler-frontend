import update from 'react/lib/update'
import {
  BOILER_PATH_LOADED,
  BOILER_USER_DETAILS_MESSAGE
} from './actions'

const DEFAULT_STATE = {
  currentPage: {
    path: null,
    requireUser: null
  },
  // controls the snackbar on the user details page
  userDetailsMessage:null
}

export default function boilerreducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {

    // clicked a node in the tree
    case BOILER_PATH_LOADED:

      return update(state, {
        currentPage:{
          $set:{
            path:action.path,
            requireUser:action.requireUser
          }
        }
      })

    case BOILER_USER_DETAILS_MESSAGE:

      return update(state, {
        userDetailsMessage:{
          $set:action.message
        }
      })
      
    default:
      return state
  }
}