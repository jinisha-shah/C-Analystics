import useForm from "../../hooks/use-form";
import React from "react";
import { setAccessToken } from "../../core/utils/token";
import { useHistory } from "react-router";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

import { validateUserLogin } from "../../core/validations/user-validations";
import { userLogin } from "../../core/services/api/user";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"


const Login = () => {
  const history = useHistory();
  const handleLogin = async () => {
    const result = await userLogin(values);
    // alert(JSON.stringify(result.message));
    if (result && result.message === "Sucessfully Login" ){
      toast.success(result.message);
      setAccessToken(result.data);
      history.push("/admin/dashboard");
    }
   else{
      toast.error(result.message);
   }
  }
  const { values, errors, handleSubmit, handleChange } = useForm(
    handleLogin,
    validateUserLogin
  );


  return (

    <>
      <ToastContainer />
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    name="email"
                    value={values.email === undefined ? "" : values.email}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.email && (
                  <p className="text-danger">
                    <small>{errors.email}</small>
                  </p>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password === undefined ? "" : values.password}
                    onChange={handleChange}

                  />
                </InputGroup>
                {errors.password && (
                  <p className="text-danger">
                    <small>{errors.password}</small>
                  </p>
                )}
              </FormGroup>
         
              <div className="text-center">
                <Button className="my-4" style={{ color: "#fff", backgroundColor: "#172b4d" }} type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
     
      </Col>
    </>
  );
};

export default Login;
