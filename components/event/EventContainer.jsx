import { Col, Row, Spin } from "antd";
import React, { Suspense } from "react";
import EventCard from "./EventCard";

const EventContainer = () => {
  return (
    <Row className="w-full">
      <Col xs={24} sm={24} md={24} lg={24} className="w-full px-2 md:px-0">
        <EventCard />
      </Col>
    </Row>
  );
};

export default EventContainer;
