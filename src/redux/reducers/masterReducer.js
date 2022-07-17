import { SET_ALL_SKILLS, SET_ALL_PROJECTS, SET_ALL_SKILL_LEVELS } from '../actions/types/type';

const initState = {
  skills: [],
  skillLevels: [],
  projects: []
};

const MasterReducer = (state = initState, action) => {
    
  switch (action.type) {
    case SET_ALL_SKILLS:
      return {
        ...state,
        skills: action.payload.data
      };
    case SET_ALL_SKILL_LEVELS:
      return {
        ...state,
        skillLevels: action.payload.data
      };
    case SET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.payload.data
      };
    default:
      return { ...state };
  }
};

export default MasterReducer;
