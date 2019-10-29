import { put, takeLatest, all } from 'redux-saga/effects';

import { FETCH_ALL, ITEMS_RECEIVED, FETCH_START, FETCH_DONE } from './actions/actions';

const url = 'https://et489h5atg.execute-api.us-west-2.amazonaws.com/default/Dictionary';
const options = {
    headers: {
        'x-api-key' : 'yybTDPxOF96jzOQa0bm4g6LM8kd9FDjw2z1hRg7q'
    }
}

function* fetchAll() {
  yield put({ type: FETCH_START });
  const json = yield fetch(url, options)
    .then(response => response.json(), );    
  yield put({ type: ITEMS_RECEIVED, json: json });
  yield put({ type: FETCH_DONE });
}

function* actionWatcher() {
  yield takeLatest(FETCH_ALL, fetchAll)
}

export default function* rootSaga() {
   yield all([
    actionWatcher(),
   ]);
}