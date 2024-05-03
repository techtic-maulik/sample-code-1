import { Col, Typography } from "antd";
import Image from "next/image";
import React from "react";

const InfoCard = ({ image, title, description }) => {
  return (
    <Col className="w-[277px] flex flex-col justify-evenly items-center mx-auto pb-[20px]">
      {/* <Image src={image} alt={title} width={120} height={120} /> */}
      <div className="flex justify-center items-center w-[120px] h-[120px] rounded-[32px] bg-white">
        <Image src={image} alt={title} width={60} height={60} />
      </div>
      <Typography
        className="mx-auto w-[250px] flex justify-center text-[22px] text-[#323232] font-AvantGarde font-custom-md mt-[30px]"
        style={{ lineHeight: "26.37px", fontWeight: 400 }}
      >
        {title}
      </Typography>
      <Typography
        className="mx-auto w-[250px] flex justify-center font-avantGarde-bk text-[14px] text-[#7A7A7A] text-center mt-4 opacity-80"
        style={{ lineHeight: "21px" }}
      >
        {description}
      </Typography>
    </Col>
  );
};

export default InfoCard;
