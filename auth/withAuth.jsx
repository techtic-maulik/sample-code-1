import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    if (!isAuthenticated) {
      router.push("/login");
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

export default withAuth;
