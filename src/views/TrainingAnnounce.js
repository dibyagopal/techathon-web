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
import { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, UncontrolledAlert } from 'reactstrap';
// core components
import UserHeader from 'components/Headers/UserHeader.js';
import { connect } from 'react-redux';
import Select from 'react-select';
import { api } from 'api';
import { toastr } from 'react-redux-toastr';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import UserInfo from 'components/UserInfo';

const TrainingAnnouce = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState('10:00');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedTopicType, setSelectedTopicType] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [note, setNote] = useState('');
  const [buttonStatus, setButtonStatus] = useState(true);
  const [selectStatus, setSelectStatus] = useState(true);
  let user = JSON.parse(localStorage.getItem('knowledgesquare'));

  const { skills, projects, skillLevels } = props;
  let skillsOption = skills.map((item, idx) => {
    return { label: item.skill_name, value: item.id };
  });
  let projectOption = projects.map((item, idx) => {
    return { label: item.project_name, value: item.id };
  });
  let topicTypeOptions = [
    { label: 'General', value: 'general' },
    { label: 'Project specific', value: 'project_specific' }
  ];

  useEffect(() => {
    // let selectedSkillLength = Object.keys(selectedSkill).length;
    // let selectedTopicTypeLength = Object.keys(selectedTopicType).length;
    // let selectedProjectlLength = Object.keys(selectedProject).length;
    if (selectedTopicType) {
      if (selectedTopicType.value === 'project_specific') {
        setSelectStatus(false);
      } else {
        setSelectStatus(true);
      }
    }
    // || (selectedTopicType.value === 'project_specific' && !selectedProjectlLength)
    if (!selectedSkill || !selectedTopicType || (selectedTopicType.value === 'project_specific' && !selectedProject)) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [selectedSkill, selectedProject, selectedTopicType]);

  const sendClicked = async () => {
    setButtonStatus(true);
    console.log('Clicked');
    let payload = {
      user_id: user.id,
      skill_id: selectedSkill.value,
      project_id: selectedTopicType.value === 'project_specific' ? selectedProject.value : 0,
      topic_type: selectedTopicType.value,
      notes: note
    };
    let request = await api('users/request-for-training', payload, 'postWithoutToken');
    console.log('request', request);
    if (request.status == 200) {
      toastr.success('Request send successfully');
      setNote('');
      setSelectedSkill(null);
      setSelectedProject(null);
      setSelectedTopicType(null);
    } else {
      toastr.error('Failed to send request');
    }
    setButtonStatus(false);
  };
  return (
    <>
      <UserHeader />
      {/* <Alert/> */}
      {/* Page content */}
      <Container className="mt--9" fluid>
        <Row>
          <UserInfo />
          {/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
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
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button className="mr-4" color="info" href="#pablo" onClick={(e) => e.preventDefault()} size="sm">
                    Connect
                  </Button>
                  <Button className="float-right" color="default" href="#pablo" onClick={(e) => e.preventDefault()} size="sm">
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user?.user_name}
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col> */}
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Training Request Details</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="lg-4">
                    <Row className="">
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Available date
                          </label>
                          <DatePicker className="form-control-alternative datetime-text" selected={startDate} onChange={(date) => setStartDate(date)} />
                          {/* <Input className="form-control-alternative" defaultValue="lucky.jesse" id="input-username" placeholder="Username" type="text" /> */}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <label className="form-control-label" htmlFor="input-first-name">
                          From time
                        </label>
                        <TimePicker className="form-control-alternative datetime-text" disableClock onChange={onChange} value={value} />
                      </Col>
                      <Col lg="6">
                        <label className="form-control-label" htmlFor="input-first-name">
                          To time
                        </label>
                        <TimePicker className="form-control-alternative datetime-text" disableClock onChange={onChange} value={value} />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            Note
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="A few words for the training announcement"
                            rows="2"
                            type="textarea"
                            onChange={(e) => setNote(e.target.value)}
                            value={note}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button block color="primary" size="lg" type="button" onClick={() => sendClicked()} disabled={buttonStatus}>
                      <span className="btn-inner--icon">
                        <i className="ni ni-send" />
                      </span>
                      <span className="btn-inner--text">Send request</span>
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  const { skills, skillLevels, projects } = state.masterData;
  return { skills, skillLevels, projects };
};

export default connect(mapStateToProps)(TrainingAnnouce);
