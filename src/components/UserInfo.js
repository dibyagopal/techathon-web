import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

const UserInfo = (props) => {
  const { userSkills, userProjects } = props;
  let user = JSON.parse(localStorage.getItem('knowledgesquare'));
  const [allSkills, setAllSkills] = useState('');

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 30);
  };
  const getRating = () => {
    let number = Math.floor(Math.random() * 5);
    number = number == 0 ? 1 : number;
    return number;
  };

  return (
    <>
      <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
        <Card className="card-profile shadow">
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img alt="..." className="rounded-circle" src={user?.user_image} height="180px" />
                </a>
              </div>
            </Col>
          </Row>
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
          <CardBody className="pt-0 pt-md-4">
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                  <div>
                    <span className="heading">{getRandomNumber()}</span>
                    <span className="description">Training Done</span>
                  </div>
                  <div>
                    <span className="heading">{getRandomNumber()}</span>
                    <span className="description">Training Attendend</span>
                  </div>
                  <div>
                    <span className="heading">{getRating()}</span>
                    <span className="description">Current Rating</span>
                  </div>
                </div>
              </div>
            </Row>
            <div className="text-center">
              <h3>
                {user?.user_name}
                <span className="font-weight-light"></span>
              </h3>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2" />
                {user?.email_id}
              </div>
              <div>
                <i className="ni education_hat mr-2" />
                {user?.organization_code}
              </div>
              <hr className="my-4" />
              <div>
                <h4>Skills</h4>
                <small className="h5 mt-4">
                  
                    {userSkills.map((item, idx) => {
                      return <text>{item.skill_name}{idx==userSkills.length-1?'':','}</text>;
                    })}
                  
                </small>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => {
  const { userSkills, userProjects } = state.user;
  return { userSkills, userProjects };
};

export default connect(mapStateToProps)(UserInfo);
