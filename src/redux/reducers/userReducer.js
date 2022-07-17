import { SET_ALL_USER, SET_USER_DATA } from '../actions/types/type';

const initState = {
  allUser: [],
  userSkills: [],
  userProjects: []
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALL_USER:
      return {
        ...state,
        allUser: action.payload.data
      };
    case SET_USER_DATA:
      return {
        ...state,
        userSkills: action.payload.data.skills,
        userProjects: action.payload.data.projects
      };
    default:
      return { ...state };
  }
};

export default userReducer;
