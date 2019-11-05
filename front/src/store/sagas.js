import { put, takeLatest, takeEvery, all } from 'redux-saga/effects';

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
} from './actions/actions';

const url = 'https://et489h5atg.execute-api.us-west-2.amazonaws.com/default/Dictionary';
const options = {
    headers: {
        'x-api-key' : 'yybTDPxOF96jzOQa0bm4g6LM8kd9FDjw2z1hRg7q'
    }
}

const urlApi = 'http://localhost:88/api/users/';

function* fetchAll() {
  // yield put({ type: FETCH_START });
  // const json = yield fetch(url, options)
  //   .then(response => response.json(), );    
  // yield put({ type: ITEMS_RECEIVED, json: json });
  yield put({ type: FETCH_DONE });
}

function* login({payload}) {
  console.log('SAGA login', payload);
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }
  const json = yield fetch(urlApi + 'login', options)
    .then(response => response.json(), );
  console.log('login', json);
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
  const json = yield fetch(urlApi + 'register', options)
    .then(response => response.json(), );
  if (json.token) {
    yield put({ type: SET_TOKEN, token: json.token });
    yield put({ type: ADD_MESSAGE, text: 'register successful' });
  }
  if (json.error) {
    yield put({ type: ADD_MESSAGE, text: json.error });
  }
}

function* exit() {
  console.log('saga exit');
  yield put({type: EXIT});
}

function* actionWatcher() {
  yield takeLatest(FETCH_ALL, fetchAll);
  yield takeLatest(REGISTER, register);
  yield takeLatest(LOGIN, login);
  // yield takeLatest(EXIT, exit);
}

export default function* rootSaga() {
   yield all([
    actionWatcher(),
   ]);
}