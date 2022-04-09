const URLS = {
  SERVER_IMAGE_FOLDER_URL: process.env.REACT_APP_SERVER_IMAGE_FOLDER_URL,
  BASE_URL: process.env.REACT_APP_API_BASE_URLs,
  USER_LOGIN: "/api/auth/login",
  USER_DETAILS: "/api/auth/userDetail",
  CREATE_USERS: "/api/auth/createUser",
  DROP_DOWN: "/api/auth/userSeletion",
  USERS_LIST: "/api/auth/alluserList",
  DELETE_USER: "/api/auth/deleteUser",
  CHANGE_PASSWORD: "/api/auth/changePassword",
  CREATE_CASE: "/api/user/createCase",
  CASE_LIST: "/api/case/caseList",
  DELETE_CASE: "/api/case/deleteCase",
};

export default URLS;
