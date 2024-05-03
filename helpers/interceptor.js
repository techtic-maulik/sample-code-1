import axios from "axios";
import { store } from "../store/store";
import { userAction } from "../store/slices/userSlice";

export const customAxios = axios.create({
  baseURL: process.env.API_BASE_URL || "http://127.0.0.1:8000",
  headers: { Accept: "application/json" },
});

customAxios.interceptors.request.use(
  function (config) {
    const { dispatch } = store;
    const token = JSON.parse(localStorage.getItem("family-table-token"));
    dispatch(userAction.setLoadingTrue());
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  function (error) {
    const { dispatch } = store;
    dispatch(userAction.setLoadingFalse());
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  function (response) {
    const { dispatch } = store;
    dispatch(userAction.setLoadingFalse());
    return response;
  },
  function (error) {
    const { dispatch } = store;
    dispatch(userAction.setLoadingFalse());

    if (error.message === "Network Error") {
      return Promise.reject(new Error("Network Error"));
    }
    if (error.response.status === 401) {
      return Promise.reject(new Error("Thia page is facing issue"));
    }
    if (error.response.status === 400 || error.response.status === 500) {
      return Promise.reject(new Error(error.response.data.message));
    }
    if (error.response.status === 404) {
      return Promise.reject(new Error(error.response.statusText));
    }
    return Promise.reject(error);
  }
);
