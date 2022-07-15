import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const PublicRoute = ({ isAuthenticated, fullLayout, permission, component: Component, ...rest }) => (
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
);

const mapStateToProps = (state) => {
  // const isAuthenticated = state.login.loginFlag;
  return {};
};

export default connect(mapStateToProps)(PublicRoute);
