// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { HashLoader } from 'react-spinners';

// import ComponentSpinner from "./components/@vuexy/spinner/Loading-spinner";

import { setLoginFlag, setLoginUser } from './redux/actions/loginAction';
import { history } from './history';

const LazyApp = lazy(() => import('./App'));

const jsx = (
  <Provider store={store}>
    <Suspense fallback={<HashLoader />}>
      <LazyApp />

      {/* <ReduxToastr
        timeOut={2000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
      <ComponentSpinner /> */}
    </Suspense>
  </Provider>
);

let hasRendered = false;

const renderApp = async () => {
  // await fetch('/thing/stuck/in/cache', {method:'POST', credentials:'include'});
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    // registerServiceWorker();
    hasRendered = true;
  }
};

ReactDOM.render(<HashLoader />, document.getElementById('root'));


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
