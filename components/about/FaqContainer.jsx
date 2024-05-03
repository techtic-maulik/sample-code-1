import { Col, Row, Typography } from "antd";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const FaqContainer = ({ datakey, faqKey, title, description, setFaqKey }) => {
  const [visible, setvisible] = useState(false);
  return (
    <Row
      className="mt-[30px] flex flex-row justify-between pb-[30px]"
      // style={{ borderBottom: visible ? "" : "1px solid #C4C4C4" }}
    >
      <Col className="flex flex-1 flex-col gap-[10px] w-[80%]">
        <Typography className="text-[24px] text-[#323232] font-avantGarde-bk about-collaps-title">
          {title}
        </Typography>
        {datakey === faqKey && (
          <Typography
            className="text-[20px] text-[#7A7A7A] font-avantGarde-bk about-collaps-des_"
            style={{ lineHeight: "30px" }}
          >
            {description}
          </Typography>
        )}
      </Col>
      <div
        className="rounded-full bg-[#797EF6] p-[10px] flex justify-center items-center w-fit h-fit cursor-pointer"
        onClick={() => {
          if (datakey === faqKey) {
            setFaqKey(0);
          } else {
            setFaqKey(datakey);
          }
        }}
      >
        {datakey === faqKey ? (
          <AiOutlineMinus size={23} color="white" />
        ) : (
          <AiOutlinePlus size={23} color="white" />
        )}
      </div>
    </Row>
  );
};

export default FaqContainer;
