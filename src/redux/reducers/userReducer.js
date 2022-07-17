import { SET_ALL_USER } from '../actions/types/type';

const initState = {
  allUser: []
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALL_USER:
      return {
        ...state,
        allUser: action.payload.data
      };
    default:
      return { ...state };
  }
};

export default userReducer;
