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
                    <Row className='mb-3'>
                      <Col lg="6">
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
