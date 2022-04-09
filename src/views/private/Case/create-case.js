import { Card, CardHeader, Container, Row } from "reactstrap";
import React, { useEffect, useState, useRef } from "react";
import Header from "components/Headers/Header.js";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../../../components/Navbars/AdminNavbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import routes from "../../../routes";
import "assets/css/devicedetails.css";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { formCreateCase } from "core/services/api/Case";

function CreateCase(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateCase = async () => {
    const values = {
      name: name,
      description: description,
    };
    // console.log();
    const result = await formCreateCase(values);
    if (result && result.status && result.status === 200) {
      toast.success(result.result);
      history.push("/admin/caselist");
    }
  };

  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <ToastContainer />
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          imgSrc: require("../../../assets/img/brand/argon-react.png").default,

          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar />

        <Header show={true} />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <div className="row" style={{ display: "flex" }}>
                    <div className="col-4">
                      <h3>Create Case</h3>
                    </div>
                    <div className="col-4"></div>
                    <div className="col-4 left-8">
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
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control form-control-alternative"
                            id="exampleFormControlInput1"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-6 ">
                        <button
                          className="create-user-button"
                          onClick={handleCreateCase}
                        >
                          Create Case
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CreateCase;
