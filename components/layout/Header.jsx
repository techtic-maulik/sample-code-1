import { Button, Col, Row, Typography, theme } from "antd";
import React from "react";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  return (
    <Col
      className={`flex flex-col w-full overflow-hidden`}
      style={{ backgroundColor: token.colorPrimary }}
    >
      <Row gutter={24} className="mx-auto mt-[38px]">
        <Navbar isLandingPage={true} logo="/img/header/logo.png" />
      </Row>
      <Row className="w-10/12 mx-auto mt-[60px] 2xl:mt-[10rem]">
        <Col md={24} lg={12}>
          <Typography className="text-[40px] lg:text-[67px] text-white font-AvantGarde leading-[87.1px]">
            Bring your family together, stay connected always.
          </Typography>
          <Typography className="text-[21px] mt-6 text-[#F6F6FE]  font-avantGarde-bk  ">
            Family Table is designed to make it easy for families to stay
            connected and organized.
          </Typography>

          {/* Get Started btn */}
          <Button
            className="w-[150px] md:w-[212px] rounded-full flex justify-center items-center gap-3 h-[45px] md:h-[60px] my-8 hover:shadow-md transition-all"
            onClick={() => router.push("/register")}
          >
            <Image
              src="/img/header/rocket-launch.png"
              alt="rocket"
              width={20}
              height={20}
            />
            <Typography className="text-primary text-[14px] md:text-[16px] font-AvantGarde">
              Get Started
            </Typography>
          </Button>
        </Col>
        <Col md={0} lg={12} className="justify-center relative hidden lg:flex">
          <Image
            src="/img/header/landing-right.png"
            alt="landing-right"
            width={450}
            height={541}
            className="absolute bottom-0"
          />
        </Col>
      </Row>
    </Col>
  );
};

export default Header;
