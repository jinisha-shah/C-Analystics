import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardFooter,
  CardBody,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { getCaseList } from "core/services/api/Case";
import moment from "moment";
import ModalComponent from "shared/Modal-Component/modelComponent";
import { handleDeleteCase } from "core/services/api/Case";

function CaseList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [usersResult, setUsersResult] = useState([]);
  const [show, setShow] = useState(false);

  const history = useHistory();

  const fetchCaseList = async () => {
    const result = await getCaseList();

    if (
      result &&
      result.status &&
      result.status === 200 &&
      result.result.length > 0
    ) {
      // console.log(result.result[0]);
      setUsers(result.result[0]);
      setShow(true);
      setPageCount(Math.ceil(result.result.length / perPage));
      const tempList = result.result[0].slice(currentPage * perPage, perPage);
      setUsersResult(result.result);
      setUsers(tempList);
    }
  };

  useEffect(() => {
    fetchCaseList();
  }, []);

  useEffect(() => {
    const tempList = usersResult.slice(
      currentPage * perPage,
      currentPage * perPage + perPage
    );
    setUsers(tempList);
  }, [currentPage]);

  const handleClick = (e) => {
    setCurrentPage(e.selected);
  };

  const handlePage = () => {
    history.push("/createcase");
  };
  const deleteCase = async (id) => {
    const values = {
      ID: id,
    };
    const result = await handleDeleteCase(values);
    // alert(JSON.stringify(result));
    if (result && result.Status && result.Status == 200) {
      window.location.reload(true);
      fetchCaseList();
    }
  };

  return (
    <>
      <Header show={true} />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row" style={{ display: "flex" }}>
                  <div className="col-4">
                    <h3>Case List</h3>
                  </div>
                  <div className="col-4"></div>
                  <div className="col-4">
                    <button
                      type="button"
                      className="btn btn-info "
                      onClick={handlePage}
                    >
                      Create Case
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Case Discription</th>
                      <th scope="col">Create date</th>
                      <th scope="col">Case Creator</th>
                      <th scope="col">Role</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users !== undefined &&
                      users.map((cases, index) => (
                        <tr
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <td> {cases.name} </td>
                          <td> {cases.caseDescription} </td>
                          <td>
                            {moment(cases.createDate).format("DD/MM/YYYY")}
                            <br />
                            {moment(cases.createDate).format("h:mm a")}
                          </td>
                          <td> {cases.CaseCreator} </td>
                          <td> {cases.Role} </td>
                          <td>
                            <ModalComponent
                              id={cases.ID}
                              action={"Confirm"}
                              Name={"Delete"}
                              handleAction={deleteCase}
                              text={"Are You Sure to Delete this User ?"}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>

              {show === true ? (
                <CardFooter
                  className="mt-3 align-self-end"
                  style={{ position: "relative", zIndex: "1" }}
                >
                  <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handleClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </CardFooter>
              ) : (
                ""
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CaseList;
