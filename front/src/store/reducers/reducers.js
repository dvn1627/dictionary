import { combineReducers } from 'redux'

import {
  FETCH_START,
  FETCH_DONE,
  ITEMS_RECEIVED,
} from '../actions/actions'

const items = (state = [], action) => {
  switch (action.type) {
    case ITEMS_RECEIVED:
      return action.json;
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case FETCH_START:
      return true;
    case FETCH_DONE:
      return false;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  items,
  loading,
})

export default rootReducer