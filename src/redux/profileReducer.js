import {usersAPI, profileAPI} from '../api';
import {stopSubmit} from 'redux-form';

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SUCCESSFULLY_SAVED_PHOTO = 'SUCCESSFULLY_SAVED_PHOTO';

let initialState = {
  profile: null,
  status: ''
}

const ProfileReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_PROFILE: {
      return {
      ...state,
      profile: action.profile}
    }
    case SET_STATUS: {
      return {
      ...state,
      status: action.status
      }
    }
    case SUCCESSFULLY_SAVED_PHOTO:
      return {...state, profile: {...state.profile, photos:action.photos}}
    default:
        return state;
  }
}

export const setUserProfile = (profile) => ({ type: 'SET_USER_PROFILE', profile});
export const setStatus = (status) => ({ type: 'SET_STATUS', status});
export const successfullySavedPhoto = (photos) => ({ type: 'SUCCESSFULLY_SAVED_PHOTO', photos});

export const getUserProfile = (userId) => async(dispatch) => {
  let response = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async(dispatch) => {
  let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async(dispatch) => {
    let response = await profileAPI.updateStatus(status);
        if(response.data.resultCode === 0) {
             dispatch(setStatus(status));
        }
};

export const savePhoto = (file) => async(dispatch) => {
  let response = await profileAPI.savePhoto(file);
      if(response.data.resultCode === 0) {
           dispatch(successfullySavedPhoto(response.data.data.photos));
      }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id;
  const response = await profileAPI.saveProfile(profile);

       if (response.data.resultCode === 0 ) {
       dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

export default ProfileReducer;
