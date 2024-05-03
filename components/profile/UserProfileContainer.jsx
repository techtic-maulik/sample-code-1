import { Col, Row } from "antd";
import React from "react";
import UserProfile from "./UserProfile";

const UserProfileContainer = () => {
  return (
    <Row className="w-full">
      <Col span={24}>
        <UserProfile />
      </Col>
    </Row>
  );
};

export default UserProfileContainer;
