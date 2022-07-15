import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { history } from '../history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
// Route-based code splitting
// const Home = lazy(() => import('./views/pages/Home'));

const Login = lazy(() => import('../pages/Login'));

//Routes
const Dashboard = lazy(() => import('../pages/Dashboard'));

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <PublicRoute path="/login" component={Login} fullLayout />

          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
