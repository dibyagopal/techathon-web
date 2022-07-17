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
import { Container, Row, Col } from 'reactstrap';

const UserHeader = () => {
  let user = JSON.parse(localStorage.getItem('knowledgesquare'));
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: '400px',
          backgroundImage: 'url(' + require('../../assets/img/theme/profile-cover.jpg').default + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="10">
              <h1 className="display-2 text-white">
                Hello, <text style={{ color: '#1edc4e' }}>{user?.user_name}</text>
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
