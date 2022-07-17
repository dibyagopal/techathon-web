import { SET_ALERT } from './types/type';

export const setAlert = (value) => {
  return {
    type: SET_ALERT,
    payload: { data: value }
  };
};
