import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

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
              <Suspense fallback={<HashLoader />}>
                <Component {...props} />
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
