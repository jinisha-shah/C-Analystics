import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, Container, CardBody } from "reactstrap";
import Header from "components/Headers/Header.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { useLocation } from "react-router-dom";
import routes from "routes";
import "../../assets/css/devicedetails.css";
import { useHistory } from "react-router-dom";
import { getUserDetail } from "../../core/services/api/userDetails";
import ChangePassword from "./changePassword";
import CardComponent from "shared/card-component";

function UserDetails(props) {
  const history = useHistory();
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [role, setRole] = useState([]);
  const [id, setId] = useState([]);

  const fetchUsersDetailsList = async () => {
    const result = await getUserDetail();
    // alert(JSON.stringify(result.data[0].ID));
    if (result && result.message === "Sucessfully Login") {
      setName(result.data[0].name);
      setEmail(result.data[0].email);
      setRole(result.data[0].role);
      setId(result.data[0].ID);
    }
  };
  useEffect(() => {
    fetchUsersDetailsList();
  }, []);

  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const handleBack = () => {
    history.push("/admin/dashboard");
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          imgSrc: require("../../assets/img/brand/argon-react.png").default,

          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar />

        <Header show={true} />
        <Container className="mt--7 mb-5" fluid>
          <Card className="shadow">
            <CardHeader className="border-0">
              <div className="row" style={{ display: "flex" }}>
                <div className="col-4">
                  <h3>My Details</h3>
                </div>
                <div className="col-4"></div>
                <div className="col ml-8">
                  <button
                    type="button"
                    class="btn btn-info "
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-6 ">
                  <CardComponent Title={"ID"} thing={id} />
                </div>
                <div className="col-6">
                  <CardComponent Title={"Name"} thing={name} />
                </div>
                <div className="col-6">
                  <CardComponent Title={"Email"} thing={email} />
                </div>
                <div className="col-6">
                  <CardComponent Title={"Role"} thing={role} />
                </div>
                <div className="col-6">
                  <ChangePassword />
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default UserDetails;
