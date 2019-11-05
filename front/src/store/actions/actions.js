export const FETCH_ALL = 'FETCH_ALL';
export const FETCH_START = 'FETCH_START';
export const FETCH_DONE = 'FETCH_DONE';
export const ITEMS_RECEIVED = 'ITEMS_RECEIVED';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const SET_TOKEN = 'SET_TOKEN';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const EXIT = 'EXIT';

export const fetchAllAction = () => ({ type: FETCH_ALL })
export const loginAction = (payload) => ({ type: LOGIN, payload })
export const registerAction = (payload) => ({ type: REGISTER , payload});
export const exitAction = () => ({ type: EXIT });
// export const exitAction = () => {
//     console.log('action exit');
//     return {type: EXIT}
// };
