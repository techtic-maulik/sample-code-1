import withOutAuth from "../auth/withOutAuth";
import AuthLayout from "../components/auth/AuthLayout";
import Login from "../components/auth/Login";
import React from "react";
import DashboardPage from "./dashboard";

const login = () => {
  return (
    <AuthLayout>
      <Login dashboard={<DashboardPage />} />
    </AuthLayout>
  );
};

export default withOutAuth(login);
