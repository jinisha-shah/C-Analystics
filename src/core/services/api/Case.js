/* eslint-disable camelcase */
import URLS from "../../../configs/api-end-points";
import apiServices from "../data/api_service";

const formCreateCase = async (values) => {
  const data = {
    name: values.name,
    description: values.description,
  };
  const url = URLS.CREATE_CASE;
  const result = await apiServices.post(url, data);
  return result;
};

const getCaseList = async () => {
  const url = `${URLS.CASE_LIST}`;
  const result = await apiServices.get(url, {});
  // console.log(result);
  return result;
};

const handleDeleteCase = async (values) => {
  // console.log(values,"oihuihoi")
  const data = {
    ID: values.ID,
  };
  const url = URLS.DELETE_CASE;
  const result = await apiServices.delet(url, data);
  // console.log("Details result ---------------->", result);
  return result;
};

export { formCreateCase, getCaseList, handleDeleteCase };
