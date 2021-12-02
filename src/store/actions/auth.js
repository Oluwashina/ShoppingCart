import cogoToast from "cogo-toast";
import { PostApi } from "../request";


// login user actions functionality
export const loginUser = (user) => {
  return async (dispatch, getState) => {
    try {
      const res = await PostApi(`login`, { ...user }, "", "application/json");
      if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", data: res.data });
          cogoToast.success("Login Successful!", {
            position: "bottom-right",
        });      
      }
       if (res.status === 400) {
         cogoToast.error(`${res.data}`);
       }
    } catch (err) {
      console.log(err);
    }
  };
};