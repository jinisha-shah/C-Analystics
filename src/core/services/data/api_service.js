import { getAccessToken } from "core/utils/token";
import URLS from "../../../configs/api-end-points";

const getHeaders = () => {
  const accessToken = getAccessToken();
  let headers = {};

  if (accessToken) {
    headers = { Authorization: `Bearer ${accessToken}` };
  };

  const contentType = { "Content-Type": "application/json" };
  headers = { ...headers, ...contentType };
  return headers;
};

const post = async (url, data = {}) => {

  let response = {};
  await fetch(`${URLS.BASE_URL}${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: getHeaders(),
  })
    .then(async (result) => {
      response = await result.json();
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

const get = async (url) => {
  let response = {};
  await fetch(`${URLS.BASE_URL}${url}`, {
    method: "GET",
    headers: getHeaders(),
  })
    .then(async (result) => {
      response = await result.json();
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

const delet = async (url, data = {}) => {
  let response = {};
  await fetch(`${URLS.BASE_URL}${url}`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: getHeaders(),
  })
    .then(async (result) => {
      response = await result.json();
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

const patch = async (url, data = {}) => {
  let response = {};
  await fetch(`${URLS.BASE_URL}${url}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: getHeaders(),
  })
    .then(async (result) => {
      response = await result.json();
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};


export default { get, post, delet , patch};
