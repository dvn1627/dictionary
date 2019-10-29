import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import AllPage from './pages/all';
import LeanPage from './pages/lean';
import reducer from './store/reducers/reducers';
import rootSaga from './store/sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './style.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <nav className="main-navigation">
          <Link to='/'>Lean</Link>
          <Link to='/dictionary'>Dictionary</Link>
        </nav>
        <Switch>
            <Route path="/dictionary">
              <AllPage />
            </Route>
            <Route path="/">
              <LeanPage />
            </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;