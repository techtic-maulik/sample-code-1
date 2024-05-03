import withAuth from "../auth/withAuth";
import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MessageContainer from "../components/messages/MessageContainer";
import { useSelector } from "react-redux";

const MessagesPage = () => {
  const groups = useSelector((store) => store.user.groups);
  return (
    <DashboardLayout
      emptyImage="/img/dashboard/nomessage.png"
      title="No Messages"
      description="Oops! You don’t have any messages yet. Add members to and 
      start Messaging."
      buttonText="Start Messaging"
    >
      {groups.length > 0 && <MessageContainer />}
    </DashboardLayout>
  );
};

export default withAuth(MessagesPage);
