import {usersAPI} from '../api';

const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  users: [],
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true
}

const UsersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS: {
           return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
           return {...state, currentPage: action.currentPage}
        }
        case SET_USERS_TOTAL_COUNT: {
           return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
           return {...state, isFetching: action.isFetching}
        }
    default:
        return state;
   }

}

export const setUsers = (users) => ({ type: 'SET_USERS', users});
export const setCurrentPage = (currentPage) => ({ type: 'SET_CURRENT_PAGE', currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({ type: 'SET_USERS_TOTAL_COUNT', count: totalUsersCount});
export const toggleIsFetching = (isFetching) => ({ type: 'TOGGLE_IS_FETCHING', isFetching});

export const requestUsers = (page, pageSize) => {
    return async(dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(toggleIsFetching(false));
    }
}

export default UsersReducer;
