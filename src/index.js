/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setLoginFlag, setLoginUser } from './redux/actions/loginAction';
import { history } from './history';
import { Spinner } from './components/Loading';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { checkUser, getAllUser } from './redux/actions/apiAction/usersApi';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';
import './index.css';

import AdminLayout from 'layouts/Admin.js';
import AuthLayout from 'layouts/Auth.js';
import { getAllMasterData } from './redux/actions/apiAction/masterDataApi';

const LazyApp = lazy(() => import('./App'));
// const jsx = (
//   <Provider store={store}>
//     <BrowserRouter>
//       <LazyApp />
//     </BrowserRouter>
//     <React.StrictMode>
//       <ReduxToastr
//         timeOut={2000}
//         newestOnTop={false}
//         preventDuplicates
//         position="top-right"
//         transitionIn="fadeIn"
//         transitionOut="fadeOut"
//         progressBar
//         closeOnToastrClick
//       />
//     </React.StrictMode>
//   </Provider>
// );

// let hasRendered = false;

// const renderApp = async () => {
//   if (!hasRendered) {
//     ReactDOM.render(jsx, document.getElementById('root'));
//     hasRendered = true;
//   }
// };
// ReactDOM.render(<Spinner />);

// const renderLogin = () => {
//   store.dispatch(setLoginFlag(false));
//   renderApp();
//   if (window.location.pathname === '/') {
//     history.push('/auth/login');
//   }
// };

// const tryLogin = async () => {
//   try {
//     let users = await store.dispatch(getAllUser());
//     const login = localStorage.getItem('knowledgesquare');
//     if (login) {
//       const loginObject = JSON.parse(login);
//       let userStatus = checkUser(loginObject);
//       if (!userStatus) throw Error;
//       console.log('LOGIN OBJECT', userStatus);
//       store.dispatch(setLoginUser(loginObject));
//       store.dispatch(setLoginFlag(true));

//       renderApp();
//       if (window.location.pathname === '/' || window.location.pathname === '/ks/' || window.location.pathname === '/ks') {
//         history.push('/');
//       } else if (window.location.pathname === '/auth/login' || window.location.pathname === '/ks/auth/login') {
//         console.log('reached there');
//         store.dispatch(setLoginFlag(false));
//         localStorage.removeItem('knowledgesquare');
//       } else {
//         // history.push(window.location.pathname);
//       }
//     } else {
//       renderLogin();
//     }
//   } catch (e) {
//     renderLogin();
//   }
// };
// tryLogin();

let jsx = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
    <ReduxToastr
      timeOut={2000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>
);

let hasRendered = false;

const renderApp = async () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};
ReactDOM.render(<Spinner />, document.getElementById('root'));

const renderLogin = () => {
  store.dispatch(setLoginFlag(false));
  renderApp();
  if (window.location.pathname === '/') {
    history.push('/auth/login');
  }
};

const tryLogin = async () => {
  try {
    let masterData = await store.dispatch(getAllMasterData());
    let users = await store.dispatch(getAllUser());
    const login = localStorage.getItem('knowledgesquare');
    if (login) {
      const loginObject = JSON.parse(login);
      let userStatus = checkUser(loginObject);
      if (!userStatus) throw Error;
      console.log('LOGIN OBJECT', userStatus);
      store.dispatch(setLoginUser(loginObject));
      store.dispatch(setLoginFlag(true));

      renderApp();
      if (window.location.pathname === '/' || window.location.pathname === '/ks/' || window.location.pathname === '/ks') {
        history.push('/');
      } else if (window.location.pathname === '/auth/login' || window.location.pathname === '/ks/auth/login') {
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
};
tryLogin();

// renderApp();

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <Switch>
//         <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//         <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
//         <Redirect from="/" to="/admin/index" />
//       </Switch>
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// );
