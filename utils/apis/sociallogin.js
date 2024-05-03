import { customAxios } from "../../helpers/interceptor";
import { userAction } from "../../store/slices/userSlice";
import { socialLoginApiRoute } from "./apiroutes";

const socialLogin = (token, provider) => {
  return async (dispatch) => {
    const social_token = token;
    try {
      const fetchData = async () => {
        const response = await customAxios.post(socialLoginApiRoute, {
          provider,
          is_web: 1,
          social_token,
        });
        if (response) {
          window.localStorage.setItem(
            "family-table-token",
            JSON.stringify(response.data.token)
          );
          window.localStorage.setItem(
            "family-table",
            JSON.stringify(response.data.data)
          );
          dispatch(userAction.setUser(response.data.data));
          dispatch(userAction.setAuthenticated(true));
        }
      };
      fetchData();
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};

export { socialLogin };
