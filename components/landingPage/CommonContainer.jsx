import { Col, Row, Typography } from "antd";
import Image from "next/image";
import React from "react";

const CommonContainer = ({
  image,
  title,
  description,
  bgColor,
  setimgLeft = false,
}) => {
  return (
    <div
      className={`flex ${
        setimgLeft ? "flex-col lg:flex-row" : "flex-col lg:flex-row-reverse"
      } items-center justify-center md:mt-[100px] py-[50px] px-0 md:px-[55px]`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Left Image */}
      <div className="flex-1">
        <div className="relative min-w-[340px] min-h-[250px] md:w-[540px] md:h-[450px]">
          <Image src={image} alt="image" fill />
        </div>
      </div>
      {/* Right Content */}
      <div className="flex flex-col md:gap-[50px] px-3 md:px-0">
        <Typography
          className="text-[18px] md:text-[38px] md:text-left font-AvantGarde"
          style={{ lineHeight: "49.4px", fontWeight: 400 }}
        >
          {title}
        </Typography>
        <Typography
          className="text-[14px] md:text-[21px] text-[#979797] font-AvantGarde"
          style={{ lineHeight: "31.5px" }}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default CommonContainer;
