import {authAPI} from '../api';
import {stopSubmit} from 'redux-form';
import {getAuthUserData} from '../redux/authReducer';

const SEUCCESSFULY_INITIALIZED = 'SEUCCESSFULY_INITIALIZED';

let initialState = {
  initialized: false,
  globalError: null
}

const AppReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEUCCESSFULY_INITIALIZED: {
      return {
        ...state,
      initialized: true
      }
    }
    default:
        return state;
  }
}

export const successfullyInitialized = () => ({ type: 'SEUCCESSFULY_INITIALIZED'});

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise])
       .then(() => {
       dispatch(successfullyInitialized());
       });
}

export default AppReducer;
