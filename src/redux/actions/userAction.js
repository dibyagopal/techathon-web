import { SET_ALL_USER } from './types/type';

export const setAllUser = (value) => {
  return {
    type: SET_ALL_USER,
    payload: { data: value }
  };
};
