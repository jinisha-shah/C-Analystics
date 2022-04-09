import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import UserDetails from "views/private/userdetails";
import ChangePassword from "views/private/changePassword";
import ImageUploader from "shared/Image-Uploader/image-uploader";
import CreateCase from "views/private/Case/create-case";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/userdetails" component={UserDetails} />
      <Route path="/changepassword" component={ChangePassword} />
      <Route path="/imageuploader" component={ImageUploader} />
      <Route path="/createcase" component={CreateCase} />

      {/* <Route path="/auth/login" component={Login} />*/}

      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
