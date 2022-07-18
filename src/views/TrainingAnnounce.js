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
import { api } from 'api';
import { toastr } from 'react-redux-toastr';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import UserInfo from 'components/UserInfo';
import moment from 'moment';

const TrainingAnnouce = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [toTime, setToTime] = useState(null);
  const [fromTime, setFromTime] = useState(null);
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
    // || (selectedTopicType.value === 'project_specific' && !selectedProjectlLength)
    if (!fromTime || !toTime) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [fromTime, toTime]);

  const sendClicked = async () => {
    setButtonStatus(true);
    console.log('Clicked');
    let customisedDate = moment(startDate).format('DD MMM, yyyy');
    let payload = {
      user_id: user.id,
      available_date: customisedDate,
      available_time_from: fromTime,
      available_time_to: toTime,
      notes: note
    };
    console.log(payload);
    let request = await api('users/training-announcement', payload, 'postWithoutToken');
    // console.log('request', request);
    if (request.status == 200) {
      toastr.success('You have annouced your availability successfully');
      setNote('');
      setStartDate(new Date());
      setFromTime(null);
      setToTime(null);
    } else {
      toastr.error('Failed to announce');
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
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Trainer Availability Details</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="lg-4">
                    <Row className="mb-3">
                      <Col lg="6">
                        <Row className="">
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="input-username">
                                Available date
                                {console.log('startDate', startDate)}
                              </label>
                              <DatePicker
                                dateFormat={'dd MMM, yyyy'}
                                className="form-control-alternative datetime-text"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                              {/* <Input className="form-control-alternative" defaultValue="lucky.jesse" id="input-username" placeholder="Username" type="text" /> */}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <label className="form-control-label" htmlFor="input-first-name">
                              From time
                            </label>
                            <TimePicker className="form-control-alternative datetime-text" disableClock onChange={setFromTime} value={fromTime} />
                          </Col>
                          <Col lg="6">
                            <label className="form-control-label" htmlFor="input-first-name">
                              To time
                            </label>
                            <TimePicker className="form-control-alternative datetime-text" disableClock onChange={setToTime} value={toTime} />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="6">
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label" htmlFor="input-first-name">
                                Note
                              </label>
                              <Input
                                className="form-control-alternative"
                                placeholder="A few words for the training announcement"
                                rows="5"
                                type="textarea"
                                onChange={(e) => setNote(e.target.value)}
                                value={note}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Button block color="primary" size="lg" type="button" onClick={() => sendClicked()} disabled={buttonStatus}>
                      <span className="btn-inner--icon">
                        <i className="ni ni-notification-70 px-1" />
                      </span>
                      <span className="btn-inner--text">Send announcement</span>
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
