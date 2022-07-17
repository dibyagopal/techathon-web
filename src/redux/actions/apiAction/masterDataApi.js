// all-master-date

import { setAllSkills, setAllSkillLevels, setAllProject } from '../masterAction';
import { api } from '../../../api';
// import { toast } from 'react-toastify';
import { toastr } from 'react-redux-toastr';
import { store } from '../../store';

export const getAllMasterData = (value) => {
  // history.push('/')
  return async (dispatch, store) => {
    await api('users/all-master-date', {}, 'get').then((res) => {
      if (res.status === 200) {
        console.log('response', res);
        dispatch(setAllSkills(res.data.skills));
        dispatch(setAllSkillLevels(res.data.skillLevels));
        dispatch(setAllProject(res.data.projects));
      } else {
        toastr.error('Unable to fetch users');
      }
    });
  };
};
