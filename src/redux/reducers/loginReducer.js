import { SET_LOGIN_USER, SET_LOGIN_FLAG } from '../actions/types/type';

const initState = {
  userRole: 'admin',
  loginUser: {},
  loginFlag: false
};

const LoginReducer = (state = initState, action) => {
  console.log("REACHED THERE");
  switch (action.type) {
    case SET_LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload.data
      };
    case SET_LOGIN_FLAG:
      return { ...state, loginFlag: action.payload.data };
    case 'CHANGE_ROLE': {
      return { ...state, userRole: action.userRole };
    }
    default:
      return { ...state };
  }
};

export default LoginReducer;
