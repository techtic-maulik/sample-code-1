import { Col, Row } from "antd";
import React from "react";
import NotificationCard from "./NotificationCard";

const NotificationContainer = ({ setFetchNotification }) => {
  return (
    <Row className="w-full px-5">
      <Col xs={24} sm={24} md={24} lg={24} className="w-full">
        <NotificationCard setFetchNotification={setFetchNotification}/>
      </Col>
    </Row>
  );
};

export default NotificationContainer;
