import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { HashLoader } from 'react-spinners';
import { setLoginFlag, setLoginUser } from './redux/actions/loginAction';
import { history } from './history';

const root = ReactDOM.createRoot(document.getElementById('root'));

const jsx = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
let hasRendered = false;

const renderApp = async () => {
  if (!hasRendered) {
    root.render(jsx);
    hasRendered = true;
  }
};
root.render(<HashLoader />);

const renderLogin = () => {
  store.dispatch(setLoginFlag(false));
  renderApp();
  if (window.location.pathname === '/' || window.location.pathname === '/es/') {
    history.push('/login');
  }
};

try {
  const login = localStorage.getItem('knowledgesquare');

  if (login) {
    const loginObject = JSON.parse(login);
    console.log('LOGIN OBJECT', loginObject);
    store.dispatch(setLoginUser(loginObject));
    store.dispatch(setLoginFlag(true));

    renderApp();
    if (window.location.pathname === '/' || window.location.pathname === '/es/' || window.location.pathname === '/es') {
      history.push('/');
    } else if (window.location.pathname === '/login' || window.location.pathname === '/es/login') {
      console.log('reached there');
      store.dispatch(setLoginFlag(false));
      localStorage.removeItem('knowledgesquare');
    } else {
      // history.push(window.location.pathname);
    }
  } else {
    renderLogin();
  }
} catch (e) {
  renderLogin();
}

reportWebVitals();
