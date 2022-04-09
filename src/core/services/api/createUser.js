/* eslint-disable camelcase */
import URLS from "../../../configs/api-end-points";
import apiServices from "../data/api_service";

const userCreate = async (values) => {
  const data = {
    name:values.name,
    email: values.email,
    password: values.password,
    role: values.role
  };
  const url = URLS.CREATE_USERS;
  const result = await apiServices.post(url, data);
  return result;
};


const fetchRoleList = async () => {

    const url = URLS.DROP_DOWN;
    const result = await apiServices.post(url);
    // console.log("Details result ---------------->", result);
    return result;
};

const deleteUser = async (values) => {
  // console.log(values,"oihuihoi")
  const data = {
    ID: values.ID

  };
  const url = URLS.DELETE_USER;
  const result = await apiServices.delet(url, data);
  // console.log("Details result ---------------->", result);
  return result;
};

export {
    userCreate, fetchRoleList, deleteUser
};

