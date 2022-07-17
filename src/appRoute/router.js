import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import { history } from '../history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AdminLayout from '../layouts/Admin';
import AuthLayout from '../layouts/Auth';
// Route-based code splitting
// const Home = lazy(() => import('./views/pages/Home'));

// const Login = lazy(() => import('../pages/Login'));

//Routes
// const Dashboard = lazy(() => import('../pages/Dashboard'));

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      // <Router history={history}>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
          {/* <PublicRoute path="/auth" />

          <PrivateRoute exact path="/admin" /> */}
        </Switch>
      // </Router>
    );
  }
}

export default AppRouter;
