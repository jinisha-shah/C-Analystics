import URLS from "configs/api-end-points";
import apiServices from "../data/api_service";

const getUserDetail = async () => {

    const url = URLS.USER_DETAILS;
    const result = await apiServices.post(url);
    // console.log("Details result ---------------->", result);
    return result;
};

const getCreatdusersList = async () => {
    const url = `${URLS.USERS_LIST}`;
    const result = await apiServices.get(url, {});
    // console.log(result);
    return result;

};

const toChangePassword = async (values) =>{
    const data = {
        newpassword : values.newpassword,
        oldpassword : values.oldpassword
      };
      const url = URLS.CHANGE_PASSWORD;
      const result = await apiServices.patch(url, data);
      // console.log("Details result ---------------->", result);
      return result;
}

export {
    getUserDetail, getCreatdusersList, toChangePassword
};

