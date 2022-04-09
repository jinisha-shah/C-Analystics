/* eslint-disable camelcase */
import URLS from "../../../configs/api-end-points";
import apiServices from "../data/api_service";

const userLogin = async (values) => {
  const data = {
    email: values.email,
    password: values.password,
  };
  const url = URLS.USER_LOGIN;
  const result = await apiServices.post(url, data);
  return result;
};

export {
  userLogin
};
