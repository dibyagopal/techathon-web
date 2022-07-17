import { SET_ALL_SKILLS, SET_ALL_SKILL_LEVELS, SET_ALL_PROJECTS } from './types/type';

export const setAllSkills = (value) => {
  return {
    type: SET_ALL_SKILLS,
    payload: { data: value }
  };
};
export const setAllProject = (value) => {
  return {
    type: SET_ALL_PROJECTS,
    payload: { data: value }
  };
};
export const setAllSkillLevels = (value) => {
    console.log("VALUE",value);
  return {
    type: SET_ALL_SKILL_LEVELS,
    payload: { data: value }
  };
};
