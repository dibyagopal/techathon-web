import React from 'react';
import { setLoginFlag } from '../redux/actions/loginAction';
import { store } from '../redux/store';
import { useHistory } from 'react-router-dom';

const Login = () => {
  let history=useHistory()
  const signInClicked = () => {
    localStorage.setItem('knowledgesquare', JSON.stringify({ user: 'abc@gmail.com' }));
    store.dispatch(setLoginFlag(true));
    history.push('/')
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => signInClicked()}>Sign In</button>
    </div>
  );
};

export default Login;
