import React from 'react';
// reactstrap components
import { Alert } from 'reactstrap';

const Alerts = (props) => {
  return (
    <>
      {props.sucess ? (
        <Alert color="success">
          <strong>Success!</strong> {props.message}
        </Alert>
      ) : null}
      {props.error ? (
        <Alert color="danger">
          <strong>Danger!</strong> {props.message}
        </Alert>
      ) : null}
      {props.alert ? (
        <Alert color="warning">
          <strong>Alert!</strong> {props.message}
        </Alert>
      ) : null}
    </>
  );
};

export default Alerts;
