import { combineReducers } from 'redux'

import {
  FETCH_START,
  FETCH_DONE,
  ITEMS_RECEIVED,
  SET_TOKEN,
  ADD_MESSAGE,
  EXIT,
  WORD_DELETED,
  WORD_ADDED,
} from '../actions/actions'

const items = (state = [], action) => {
  switch (action.type) {
    case ITEMS_RECEIVED:
      return action.json;
    case WORD_DELETED:
      return state.filter( word => word._id !== action._id);
    case WORD_ADDED:
      return [...state, action.json.data.word];
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

const token = (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN:
      window.localStorage.setItem('token', action.token);
      return action.token;
    case EXIT:
      window.localStorage.removeItem('token');
      return null;
    default:
      return window.localStorage.getItem('token') || state;
  }
}

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.text].slice(-5);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  items,
  loading,
  token,
  messages,
})

export default rootReducer