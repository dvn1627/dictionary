import { put, takeLatest, takeEvery, all, select } from 'redux-saga/effects';

import {
  FETCH_ALL,
  ITEMS_RECEIVED,
  FETCH_START,
  FETCH_DONE,
  LOGIN,
  REGISTER,
  SET_TOKEN,
  ADD_MESSAGE,
  EXIT,
  ADD_WORD,
} from './actions/actions';

const url = 'https://et489h5atg.execute-api.us-west-2.amazonaws.com/default/Dictionary';
const options = {
    headers: {
        'x-api-key' : 'yybTDPxOF96jzOQa0bm4g6LM8kd9FDjw2z1hRg7q'
    }
}

const urlApi = 'http://localhost:88/api/';

function* fetchAll() {
  const token = yield select(getToken);
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
  }
  yield put({ type: FETCH_START });
  const json = yield fetch(urlApi + 'words', options)
    .then(response => response.json(), );
  console.log('get words', json);
  yield put({ type: ITEMS_RECEIVED, json: json.data });
  yield put({ type: FETCH_DONE });
}

function* login({payload}) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }
  const json = yield fetch(urlApi + 'users/login', options)
    .then(response => response.json(), );
  if (json.token) {
    yield put({ type: SET_TOKEN, token: json.token });
    yield put({ type: ADD_MESSAGE, text: 'login successful' });
  }
}

function* register({ payload }) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }
  const json = yield fetch(urlApi + 'users/register', options)
    .then(response => response.json(), );
  if (json.token) {
    yield put({ type: SET_TOKEN, token: json.token });
    yield put({ type: ADD_MESSAGE, text: 'register successful' });
  }
  if (json.error) {
    yield put({ type: ADD_MESSAGE, text: json.error });
  }
}

export const getToken = (state) => state.token;

function* addWord({ payload }) {
  const token = yield select(getToken);
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(payload)
  }
  const json = yield fetch(urlApi + 'words', options)
    .then(response => response.json(), )
    .catch( e => console.log('ERROR', e));
  if (json.token) {
    //yield put({ type: SET_TOKEN, token: json.token });
    yield put({ type: ADD_MESSAGE, text: 'word added' });
  }
  if (json.error) {
    console.error('ERROR', json)
    yield put({ type: ADD_MESSAGE, text: json.error });
  }
}

function* actionWatcher() {
  yield takeLatest(FETCH_ALL, fetchAll);
  yield takeLatest(REGISTER, register);
  yield takeLatest(LOGIN, login);
  yield takeLatest(ADD_WORD, addWord);
}

export default function* rootSaga() {
   yield all([
    actionWatcher(),
   ]);
}