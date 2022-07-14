import { SET_LOGIN_FLAG, SET_LOGIN_USER } from './types/type';

export const setLoginUser = (value) => {
  return {
    type: SET_LOGIN_USER,
    payload: { data: value }
  };
};
export const setLoginFlag = (value) => {
  return {
    type: SET_LOGIN_FLAG,
    payload: { data: value }
  };
};
