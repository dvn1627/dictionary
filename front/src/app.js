import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import rootSaga from './store/sagas';
import reducer from './store/reducers/reducers';
import AllPage from './pages/all';
import LeanPage from './pages/lean';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import MessagesList from './components/messagesList';
import Navigation from './components/navigation';

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
        <Navigation />
        <Switch>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/dictionary">
              <AllPage />
            </Route>
            <Route path="/lean">
              <LeanPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
        </Switch>
      </Router>
      <MessagesList />
    </Provider>
  );
}

export default App;