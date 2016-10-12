import update from 'react/lib/update'
import {
  BOILER_PATH_LOADED
} from './actions'

const DEFAULT_STATE = {
  currentPage: {
    path: null,
    requireUser: false
  }
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

    default:
      return state
  }
}