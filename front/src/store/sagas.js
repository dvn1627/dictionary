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
  ADD_WORD,
  DELETE_WORD,
  WORD_DELETED,
  WORD_ADDED,
  SEND_STATISTIC,
  EXIT,
  FETCH_LEAN,
} from './actions/actions';

//const urlApi = process.env.HOST + '/api/';
const urlApi = 'api/';

console.log('ENV', process.env);

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
  yield handleApiError(json);
  yield put({ type: ITEMS_RECEIVED, json: json.data || []});
  yield put({ type: FETCH_DONE });
}

function* fetchLean() {
  const token = yield select(getToken);
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
  }
  yield put({ type: FETCH_START });
  const json = yield fetch(urlApi + 'words/lean', options)
    .then(response => response.json(), );
  yield handleApiError(json);
  yield put({ type: ITEMS_RECEIVED, json: json.data || [] });
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
  yield handleApiError(json);
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
  yield handleApiError(json);
  if (json.token) {
    yield put({ type: SET_TOKEN, token: json.token });
    yield put({ type: ADD_MESSAGE, text: 'register successful' });
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
    .then(response => response.json(), );
  yield handleApiError(json);
  if (json.message) {
    yield put({ type: WORD_ADDED, json });
    yield put({ type: ADD_MESSAGE, text: 'word added' });
  }
}

function* deleteWord({payload}) {
  const token = yield select(getToken);
  const options = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(payload)
  }
  const json = yield fetch(urlApi + 'words', options)
    .then(response => response.json(), );
  yield handleApiError(json);
  if (json.message) {
    yield put({type: WORD_DELETED, _id: payload._id});
    yield put({ type: ADD_MESSAGE, text: 'word deleted' });
  }
}

function* sendStatistic({payload}) {
  const token = yield select(getToken);
  const options = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(payload)
  }
  const json = yield fetch(urlApi + 'words', options)
    .then(response => response.json(), );
  yield handleApiError(json);
}

function* handleApiError(json) {
  if (json.error) {
    yield put({ type: ADD_MESSAGE, text: json.error.message || json.error });
  }
  if (json.error && json.error === 'not authorized') {
    yield put({type: EXIT});
  }
}

function* actionWatcher() {
  yield takeLatest(FETCH_ALL, fetchAll);
  yield takeLatest(REGISTER, register);
  yield takeLatest(LOGIN, login);
  yield takeLatest(ADD_WORD, addWord);
  yield takeLatest(DELETE_WORD, deleteWord);
  yield takeLatest(SEND_STATISTIC, sendStatistic);
  yield takeLatest(FETCH_LEAN, fetchLean);
}

export default function* rootSaga() {
   yield all([
    actionWatcher(),
   ]);
}