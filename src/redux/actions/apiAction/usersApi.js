import { setAllUser } from '../userAction';
import { api } from '../../../api';
import { history } from '../../../history';
// import { toast } from 'react-toastify';
import {toastr} from 'react-redux-toastr'
import { store } from '../../store';

export const getAllUser = (value) => {
  // history.push('/')
  return async (dispatch, store) => {
    await api('users/all', {}, 'get').then((res) => {
      if (res.status === 200) {
        dispatch(setAllUser(res.data));
      } else {
        toastr.error('Unable to fetch users');
      }
    });
  };
};

export const checkUser = (user) => {
  let allUser = store.getState().user.allUser;
  try {
    const { email, password, id } = user;
    let filterUser = allUser.filter((i) => i.id == id);
    if (filterUser.email === email && filterUser.password === password) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const filterUser = (user) => {
  let allUser = store.getState().user.allUser;
  try {
    const { email, password } = user;
    let findUser = allUser.filter((i) => i.email_id == email && i.user_password == password);
    if (findUser.length) {
      return { foundUser: true, user: findUser[0] };
    } else {
      return { foundUser: false };
    }
  } catch (error) {
    console.log(error);
    return { foundUser: false };
  }
};
