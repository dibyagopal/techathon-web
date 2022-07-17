import { SET_ALL_USER,SET_USER_DATA } from './types/type';

export const setAllUser = (value) => {
  return {
    type: SET_ALL_USER,
    payload: { data: value }
  };
};
export const setUserData = (value) => {
  return {
    type: SET_USER_DATA,
    payload: { data: value }
  };
};
