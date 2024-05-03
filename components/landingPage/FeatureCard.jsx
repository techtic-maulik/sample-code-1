import { Row, Typography } from "antd";
import Image from "next/image";
import React from "react";

const FeatureCard = ({ icon, title, description, style }) => {
  return (
    <Row
      className={`flex shadow-md md:shadow-none md:border-[1px] md:border-[#797EF6] md:border-solid flex-col w-full md:w-[250px] h-[272px] xl:w-[300px] xl:h-[322px] items-center justify-evenly rounded-[32px] bg-white ${style}`}
      // style={{ border: "1px solid #797EF6" }}
    >
      <Image
        src={icon}
        width={120}
        height={120}
        className="w-[85px] h-[85px] xl:w-[120px] xl:h-[120px]"
        alt={title}
      />
      <Typography
        className="text-center px-4 text-[#323232] text-[22px] xl:text-[28px] w-fit font-AvantGarde"
        style={{
          fontWeight: 400,
          lineHeight: "34px",
        }}
      >
        {title}
      </Typography>
      <Typography className="w-10/12 md:w-[200px] xl:w-[250px] text-[14px] xl:text-[16px] text-[#7A7A7A] font-AvantGardeBk text-center">
        {description}
      </Typography>
    </Row>
  );
};

export default FeatureCard;
