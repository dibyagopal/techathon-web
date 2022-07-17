import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from '../components/Loading';
import AdminLayout from '../layouts/Admin';

// Main Layout
const PrivateRoute = ({ isAuthenticated, fullLayout, permission, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <Route
          {...rest}
          render={(props) => {
            return (
              <Suspense fallback={<Spinner />}>
                <AdminLayout {...props} />
              </Suspense>
            );
          }}
        />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = (state) => {
  const isAuthenticated = state.login.loginFlag;
  return { isAuthenticated };
};

export default connect(mapStateToProps)(PrivateRoute);
