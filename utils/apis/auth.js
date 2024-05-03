// import { customAxios } from "../helpers/interceptor";
import { customAxios } from "../../helpers/interceptor";
import { userAction } from "../../store/slices/userSlice";
import {
  addGroup,
  deleteAccount,
  forgotPassword,
  getUserByID,
  isOnNotification,
  loginApiRoute,
  signupApiRoute,
} from "./apiroutes";

// Action for Login
export const loginAsync = (data) => {
  return async (dispatch) => {
    try {
      const response = await customAxios
        .post(loginApiRoute, {
          email: data.email,
          password: data.password,
          is_web: 1,
        })
        .then((res) => res.data);
      if (response.status_code === 200) {
        window.localStorage.setItem(
          "family-table",
          JSON.stringify(response.data)
        );
        window.localStorage.setItem(
          "family-table-token",
          JSON.stringify(response.token)
        );
        dispatch(userAction.setUser(response.data));
        dispatch(userAction.setAuthenticated(true));
        return { status: true, message: "login successful." };
      } else {
        return { status: true, message: "Something went wrong !" };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

// Action for Signup
export const signupAsync = (data) => {
  return async (dispatch) => {
    try {
      const response = await customAxios
        .post(signupApiRoute, {
          name: data.name,
          email: data.email,
          password: data.password,
          country_code: data.country_code,
          phone: data.phone,
          device_token: "android@gmail.com",
          device_type: "android",
          is_web: 1,
        })
        .then((res) => res.data);

      if (response.status_code === 200) {
        window.localStorage.setItem(
          "family-table",
          JSON.stringify(response.data)
        );
        window.localStorage.setItem(
          "family-table-token",
          JSON.stringify(response.token)
        );
        return {
          status: true,
          message: "Signup successful.",
          response: response.data,
          dispatch: dispatch,
        };
      } else {
        return { status: false, message: "Something went wrong !" };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

export const resetPasswordAsync = async (data) => {
  try {
    const response = await customAxios.post(forgotPassword, {
      email: data.email,
    });

    return { status: true, message: response.data.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const addGroupAsync = async (data) => {
  try {
    const formData = new FormData();
    formData.append("group_name", data.groupName);
    formData.append("group_photo", data.img);
    // formData.append("group_description", "this is a testcase !");
    const response = await customAxios.post(addGroup, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { status: true, message: "Group created." };
  } catch (error) {
    return { status: false, message: "Image upload failed." };
  }
};

export const deleteAccountAsync = async (data) => {
  try {
    const response = await customAxios.delete(`${deleteAccount}/${data}`);
    return { status: true, message: response.data.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
export const isOnNotificationAsync = async (data) => {
  try {
    const response = await customAxios.post(isOnNotification, {
      is_on: data,
    });
    return { status: true, message: response.data.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
export const getUserProfileByID = async (id) => {
  try {
    const response = await customAxios.get(`${getUserByID}/${id}`);
    return { status: true, message: response.data.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
