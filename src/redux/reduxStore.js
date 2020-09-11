import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import usersReducer from './usersReducer';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './appReducer';

let reducers = combineReducers({
  usersPage: usersReducer,
  profilePage: profileReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window._store_ = store;

export default store;
