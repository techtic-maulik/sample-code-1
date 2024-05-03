import withOutAuth from "../auth/withOutAuth";
import AuthLayout from "../components/auth/AuthLayout";
import Signup from "../components/auth/Signup";

const register = () => {
  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
};

export default withOutAuth(register);
