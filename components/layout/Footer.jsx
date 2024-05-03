import { Row, Typography } from "antd";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[#323232] flex flex-col md:flex-row items-center justify-center py-[24px] px-[60px]">
      {/* Copyright text */}
      <Typography
        className="font-avantGarde-bk text-white text-[14px]"
      >
        {new Date().getFullYear()} © Mobile App Fund LLC{" "}
      </Typography>
      {/* Social icons */}
      {/* <Row className="flex gap-[16px]">
        <Image
          src="/img/footer/social-instagram.png"
          alt="instagram"
          width={32}
          height={32}
        />
        <Image
          src="/img/footer/social-linkedin.png"
          alt="linkedin"
          width={32}
          height={32}
        />
        <Image src="/img/footer/social-youtube.png" alt="youtube" width={32} height={32} />
        <Image src="/img/footer/social-twitter.png" alt="twitter" width={32} height={32} />
      </Row> */}
    </div>
  );
};

export default Footer;
