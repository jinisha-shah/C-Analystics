import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Devices from "views/private/devices";
import Dashboard from "views/private/dashboard";
import UsersList from "views/private/usersList";
import CreateUsers from "views/private/usersCreate";
import CaseList from "views/private/Case/case-list";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/createusers",
    name: "Create Users",
    component: CreateUsers,
    layout: "/admin",
  },
  {
    path: "/userslist",
    name: "Users List",
    component: UsersList,
    layout: "/admin",
  },
  {
    path: "/caselist",
    name: "Case List",
    component: CaseList,
    layout: "/admin",
  },

  // public routes

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
