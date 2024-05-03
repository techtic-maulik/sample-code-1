import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ChatsCard from "./ChatsCard";
import ChatContainerCard from "./ChatContainerCard";
import useChat from "@/utils/useChat";
import ListenContext from "../context/ListenContext";

const MessageContainer = () => {
  const [group, setUser] = useState();

  return (
    <Row className="w-full">
      <Col xl={12} lg={12} sm={24} xs={24} className="p-3">
        <ChatsCard setUser={setUser} group={group} />
      </Col>
      <Col xl={12} lg={12} sm={24} xs={24} className="p-3">
        <ChatContainerCard group={group} setUser={setUser} />
      </Col>
    </Row>
  );
};

export default MessageContainer;
