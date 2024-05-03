import withAuth from "../auth/withAuth";
import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import EventContainer from "@/components/event/EventContainer";

const EventPage = () => {
  return (
    <DashboardLayout
      emptyImage="/img/dashboard/noevent.png"
      title="No Events"
      description="Remind every one your plans. Create new event and let everyone notify with the event."
      buttonText="Create Event"
    >
      <EventContainer />
    </DashboardLayout>
  );
};

export default withAuth(EventPage);
