import AuthLayout from "../components/auth/AuthLayout";
import ResetPassword from "../components/auth/ResetPassword";
import withOutAuth from "../auth/withOutAuth";

import React from "react";
const resetpassword = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default withOutAuth(resetpassword);
