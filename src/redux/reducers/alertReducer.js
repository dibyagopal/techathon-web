import { SET_ALERT } from '../actions/types/type';

const initState = {
  success: false,
  error: false,
  alert: false,
  message: ''
};

const AlertReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        success: action.payload.data.success,
        message: action.payload.data.message
      };

    default:
      return { ...state };
  }
};

export default AlertReducer;
