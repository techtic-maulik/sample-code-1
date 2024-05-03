import { Col, Row } from "antd";
import React from "react";
import MemberInvitationCard from "./MemberInvitationCard";

const MemberInvitationContainer = () => {
  return (
    <Row className="w-full px-5">
      <Col span={24}>
        <MemberInvitationCard />
      </Col>
    </Row>
  );
};

export default MemberInvitationContainer;
