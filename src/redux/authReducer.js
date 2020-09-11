import {authAPI, securityAPI} from '../api';
import {stopSubmit} from 'redux-form';

const GET_CAPTCHA_URL_ENTER = 'GET_CAPTCHA_URL_ENTER';
const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
}

const AuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_ENTER:
      return {
      ...state,
      ...action.payload
      }
    default:
        return state;
  }
}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: 'SET_USER_DATA', payload:
{id, email, login, isAuth}});

export const getCaptchaUrlEnter = (captchaUrl) => ({ type: 'GET_CAPTCHA_URL_ENTER', payload:
{captchaUrl}});

export const getAuthUserData = () => async(dispatch) => {
  let response = await authAPI.me();
      if(response.data.resultCode === 0) {
          let {id, login, email} = response.data.data;
          dispatch(setAuthUserData(id, email, login, true));
     }
}
export const login = (email, password, rememberMe, captcha) => async(dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
      if(response.data.resultCode === 0) {
           dispatch(getAuthUserData())
       } else {
         if (response.data.resultCode === 10) {
             dispatch(getCaptchaUrl());
         }
         let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Wrong email or password';
         dispatch(stopSubmit('login', {_error: message}));
       }
}

export const getCaptchaUrl = () => async(dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
      const captchaUrl = response.data.url;
         dispatch(getCaptchaUrlEnter(captchaUrl));
       }

export const logout = () => async(dispatch) => {
  let response = await authAPI.logout();
      if(response.data.resultCode === 0) {
           dispatch(setAuthUserData(null, null, null, false));
       }
}

export default AuthReducer;
