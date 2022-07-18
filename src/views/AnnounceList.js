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
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button
} from 'reactstrap';
// core components
import Header from 'components/Headers/Header.js';
import { HashLoader, RotateLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { api } from 'api';
import { toastr } from 'react-redux-toastr';

const AnnounceList = () => {
  let user = JSON.parse(localStorage.getItem('knowledgesquare'));
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    let reqlist = await await api(`users/get-all-announcement`, {}, 'get');
    setLoading(false);

    if (reqlist.status === 200) {
      setList(reqlist.data);
    }
  };

  return (
    <>
      <Header hideHeader={true} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          {console.log('loading', loading)}
          <div className="col">
            <Card className="bg-table shadow" style={{ minHeight: '500px' }}>
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Tariners</h3>
              </CardHeader>

              <Table className="align-items-center table-dark table-flush" responsive style={{ height: '100%' }}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Trainer name</th>
                    <th scope="col">Available date</th>
                    <th scope="col">Available time</th>
                    <th scope="col">Skill</th>
                    <th scope="col"> Note</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <div style={{ position: 'absolute', top: '250px', left: '50%' }}>
                      {' '}
                      <RotateLoader color="#ffffff" size={'10px'} />
                    </div>
                  ) : null}
                  {console.log('List', list)}
                  {list.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                              <img alt="..." className="rounded-circle" src={item.user_image} style={{ minHeight: '48px' }} />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{item.user_name}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{item.available_date}</td>
                        <td>
                          {item.available_time_from} - {item.available_time_to}
                        </td>
                        <td>{item.skillsString}</td>
                        <td>{item.notes}</td>
                        <td className="text-right">
                          <Button color="success" outline size="sm" type="button" onClick={(e) => toastr.success('Join request send successfully')}>
                            <span className="btn-inner--icon">
                              <i className="ni ni-check-bold" />
                            </span>
                            <span className="btn-inner--text">Join</span>
                          </Button>
                         
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {/* <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                      <PaginationItem className="disabled">
                        <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()} tabIndex="-1">
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AnnounceList;
