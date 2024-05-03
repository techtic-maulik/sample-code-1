import { userAction } from "@/store/slices/userSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const withOutAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    if (isAuthenticated) {
      dispatch(userAction.setCurrentActiveTab("Dashboard"));
      router.push("/dashboard");
      return <></>;
    } else {
      return <Component {...props} />;
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
};

export default withOutAuth;
