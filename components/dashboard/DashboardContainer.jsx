import { Col, Row } from "antd";
import GroupsCard from "./dashboardCards/GroupsCard";
import NewInvitationsCard from "./dashboardCards/NewInvitationCard";
import NewMessagesCard from "./dashboardCards/NewMessagesCard";
import FamilyEventsCard from "./dashboardCards/FamilyEventsCard";

const DashboardContainer = () => {
  return (
    <Row
      className="dashboard-cards w-full mb-[25px]"
      gutter={[24, 24]}
      // style={{ height: "110vh" }}
    >
      <Col xs={24} sm={24} md={24} lg={12} className="pr-0 lg:pr-0 ">
        <GroupsCard />
      </Col>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        className="pl-0  lg:pl-0 lg:pr-5 lg:mt-0"
      >
        <div className="h-full">
          <NewInvitationsCard />
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="h-full">
          <NewMessagesCard />
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12}>
        <div className="h-full">
          <FamilyEventsCard />
        </div>
      </Col>
    </Row>
  );
};

export default DashboardContainer;
