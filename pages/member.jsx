import withAuth from "../auth/withAuth";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MemberInvitationContainer from "@/components/memberInvitation/MemberInvitationContainer";
import { getInvitationAsync } from "../utils/apis/commonapi";


const MemberInvitationPage = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    getInvitationAsync().then((res) => {
      if (res.status) {
        setInvitations(res.data);
      }
    });
  }, []);
  return (
    <DashboardLayout
      emptyImage="/img/dashboard/sorry.png"
      title="You don’t have any invitations"
      description="Ask your family members to add you in the group. You can see
      all the requests here."
    >
      {invitations?.length !== 0 && <MemberInvitationContainer />}
    </DashboardLayout>
  );
};

export default withAuth(MemberInvitationPage);
