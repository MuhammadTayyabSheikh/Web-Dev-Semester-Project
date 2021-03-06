import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import {
  notesListReducer,
  noteCreateReducer,
  noteUpdateReducer,
  noteDeleteReducer
} from './reducers/notesReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  notesList: notesListReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = configureStore({ reducer: reducer, preloadedState: initialState, middleware: (middleware) });


export default store;