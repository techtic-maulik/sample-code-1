import { Col, Row } from "antd";
import React from "react";
import MediaCard from "./MediaCard";

const MediaContainer = () => {
  return (
    <Row className="w-full">
      <Col span={24} className="px-2 md:px-0">
        <MediaCard />
      </Col>
    </Row>
  );
};

export default MediaContainer;
