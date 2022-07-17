import { setLoginFlag, setLoginUser } from '../loginAction';
import { api } from '../../../api';
import { history } from '../../../history';
import { toastr } from 'react-redux-toastr';

export const loginApi = (loginData) => {
  return async (dispatch, store) => {
    await api('auth/login', loginData, 'postWithoutToken').then((res) => {
      console.log('REsponse', res);

      if (res.status === 200) {
        if (res.data.data.role === 'user') {
          toastr.error('you are not an admin or Manager');
        } else {
          dispatch(setLoginUser(res.data.data));
          localStorage.setItem('knowledgesquare', JSON.stringify(res.data.data));
          dispatch(setLoginFlag(true));
          toastr.success('Logged in Successfully');
          history.push('/');
        }
      } else {
        toastr.error('Invalid credentials');
      }
    });
  };
};

export const logoutApi = () => {
  // history.push('/')
  return async (dispatch, store) => {
    dispatch(setLoginUser({}));
    localStorage.removeItem('knowledgesquare');
    dispatch(setLoginFlag(false));

    history.push('/auth/login');
  };
};
