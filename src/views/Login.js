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

// reactstrap components
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, CardFooter } from 'reactstrap';
import { setLoginFlag } from '../redux/actions/loginAction';
import { store } from '../redux/store';
import { useHistory } from 'react-router-dom';
import { checkUser, filterUser, setUserDataApi } from '../redux/actions/apiAction/usersApi';
import { toastr } from 'react-redux-toastr';
import Alerts from 'components/Alerts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  let history = useHistory();
  let emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validate = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }

    if (!emailReg.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    return true;
  };
  const signInClicked = () => {
    let validField = validate();
    if (!validField) return false;
    let userStatus = filterUser({ email: email.toLowerCase(), password });
    if (!userStatus.foundUser) {
      toastr.error('Wrong credentials');
      return false;
    }
    localStorage.setItem('knowledgesquare', JSON.stringify(userStatus.user));
    store.dispatch(setUserDataApi(userStatus.user.id))
    store.dispatch(setLoginFlag(true));
    toastr.success('Login Successfully');
    history.push('/');
  };

  const onBlurHandler = (target) => {
    if (target.name === 'email') {
      if (!emailReg.test(target.value)) {
        setEmailError('Invalid email address');
      }
    }
  };

  const onChangeHandler = (target) => {
    if (target.name === 'email') {
      setEmailError('');
      setEmail(target.value);
    }
    if (target.name === 'password') {
      setPasswordError('');
      setPassword(target.value);
    }
  };
  const handleKeyDown = (key) => {
    if (key === 'Enter') {
      signInClicked();
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-center mt-2">
              <h2 class="mb-0">
                <strong style={{ color: '#173753' }}>KNOWLEDGE</strong> <strong style={{ color: '#0365ff' }}>SQUARE</strong>
              </h2>
              <div className="text-muted text-center">
                <small>Knowledge shared is knowledge squared</small>
              </div>
            </div>

            {/* <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()}>
                <span className="btn-inner--icon">
                  <img alt="..." src={require('../assets/img/icons/common/github.svg').default} />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()}>
                <span className="btn-inner--icon">
                  <img alt="..." src={require('../assets/img/icons/common/google.svg').default} />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
          </CardHeader>
          <CardBody className="px-lg-5 ">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    maxLength={100}
                    onChange={(e) => onChangeHandler(e.target)}
                    onBlur={(e) => onBlurHandler(e.target)}
                    name="email"
                    value={email}
                  />
                </InputGroup>
                {emailError ? <small className="text-danger">{emailError}</small> : null}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    onChange={(e) => onChangeHandler(e.target)}
                    onKeyDown={(e) => handleKeyDown(e.key)}
                    value={password}
                    maxLength={100}
                  />
                </InputGroup>
                {passwordError ? <small className="text-danger">{passwordError}</small> : null}
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                <label className="custom-control-label" htmlFor=" customCheckLogin">
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-2" color="primary" block  type="button" onClick={signInClicked}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
          <CardFooter>
            <div className="text-muted text-center  mb-1 mt--3">
              <small>Or sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()}>
                <span className="btn-inner--icon">
                  <img alt="..." src={require('../assets/img/icons/common/github.svg').default} />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()}>
                <span className="btn-inner--icon">
                  <img alt="..." src={require('../assets/img/icons/common/google.svg').default} />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
