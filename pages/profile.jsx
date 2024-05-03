import withAuth from "../auth/withAuth";
import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import UserProfileContainer from "../components/profile/UserProfileContainer";


const MyProfile = () => {
  return (
    <DashboardLayout>
      <UserProfileContainer />
    </DashboardLayout>
  );
};

export default withAuth(MyProfile);
