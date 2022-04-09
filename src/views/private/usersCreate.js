import { Card, CardHeader, Container, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import Header from "components/Headers/Header.js";
import "assets/css/devicedetails.css";
import { useHistory } from "react-router-dom";
import { fetchRoleList, userCreate } from "core/services/api/createUser";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function CreateUsers(props) {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const fetchUserRoleList = async () => {
    const result = await fetchRoleList();
    // alert(JSON.stringify(result));
    if (result.message === "sucess") {
      if (result.result.name === "Inspector") {
        setShow(false);
      } else {
        setRolesList(result.result);
        setShow(true);
      }
    }
  };
  useEffect(() => {
    fetchUserRoleList();
  }, []);

  const handleUserRegister = async (event) => {
    event.preventDefault();
    if (
      userName !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password !== confirmPassword) {
        toast.error("password not matched please try again");
        return;
      }
      const values = {
        name: userName,
        email: email,
        password: password,
        role: role,
      };
      const result = await userCreate(values);

      if (result && result.message) {
        // alert(JSON.stringify(result))
        // toast.success(result.message);

        history.push("/admin/userslist");
      } else {
        toast.success(result.message);
      }
    } else {
      toast.error("Please Fill All Input Fields ");
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <ToastContainer />

      <Header show={true} />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row" style={{ display: "flex" }}>
                  <div className="col-6">
                    <span className="page-title">Create User</span>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-info "
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </CardHeader>
              <div class="container mb-3">
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control form-control-alternative"
                          id="exampleFormControlInput1"
                          placeholder="Name"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control form-control-alternative"
                          id="exampleFormControlInput1"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control form-control-alternative"
                          id="exampleFormControlInput1"
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control form-control-alternative"
                          id="exampleFormControlInput1"
                          placeholder="confirm password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    {show === true ? (
                      <div className="col-md-6">
                        <select
                          onChange={(e) => setRole(e.target.value)}
                          className="dropdown-button "
                        >
                          <option disabled selected>
                            {" "}
                            Role
                          </option>
                          {rolesList !== "" ? (
                            rolesList.map((role, index) => {
                              return (
                                <option value={role.ID}>{role.name}</option>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </select>
                      </div>
                    ) : (
                      <div className="col-md-6 ">
                        <button
                          className="create-user-button mt-2 btn-lg"
                          onClick={handleUserRegister}
                        >
                          Create User
                        </button>
                      </div>
                    )}
                    {show === true ? (
                      <div className="col-md-6 ">
                        <button
                          className="create-user-button"
                          onClick={handleUserRegister}
                        >
                          Create User
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CreateUsers;
