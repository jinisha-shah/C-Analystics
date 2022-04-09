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
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import { getCreatdusersList } from "../../core/services/api/userDetails";
import ReactPaginate from "react-paginate";
import { deleteUser } from "../../core/services/api/createUser";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import ModalComponent from "../../shared/Modal-Component/modelComponent";
import { useHistory } from "react-router-dom";

function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [usersResult, setUsersResult] = useState([]);
  const [show, setShow] = useState(false);

  const history = useHistory();

  const fetchUsersList = async () => {
    const result = await getCreatdusersList();
    if (result && result.message === "sucess" && result.result.length > 0) {
      setUsers(result.result);
      setShow(true);
      setPageCount(Math.ceil(result.result.length / perPage));
      const tempList = result.result.slice(currentPage * perPage, perPage);
      setUsersResult(result.result);
      setUsers(tempList);
    }
  };

  useEffect(() => {
    fetchUsersList();
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
  const handleDelete = async (id) => {
    // console.log(id);
    const values = {
      ID: id,
    };
    const result = await deleteUser(values);
    // alert(JSON.stringify(result));
    if (result && result.Status && result.Status == 200 && result.length > 0) {
      toast.success(result.message);
      window.location.reload(true);
      // fetchUsersList();
    }
  };
  const handlePage = () => {
    history.push("/admin/createusers");
  };

  return (
    <>
      <ToastContainer />

      <div className="main-content">
        <AdminNavbar />

        <Header show={true} />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <div className="row" style={{ display: "flex" }}>
                    <div className="col-4">
                      <span className="page-title">User List</span>
                    </div>
                    <div className="col-4"></div>
                    <div className="col-4 ml-n4 ml-lg-8">
                      <button
                        type="button"
                        className="btn btn-info  "
                        onClick={handlePage}
                      >
                        Create User
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Creator</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <td> {user.name} </td>
                          <td> {user.email} </td>
                          <td> {user.role} </td>
                          <td> {user.creator} </td>
                          <td>
                            <ModalComponent
                              id={user.ID}
                              action={"Confirm"}
                              Name={"Delete"}
                              handleAction={handleDelete}
                              text={"Are You Sure to Delete this User ?"}
                            />
                            {/* <button className='butt' onClick={()=>handleDelete(user.ID)}>
                                Delete
                          </button> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>

                {show ? (
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
      </div>
    </>
  );
}

export default UsersList;
