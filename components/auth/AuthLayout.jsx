import { Col, Row, Typography } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { commonAction } from "@/store/slices/commonSlice";
import Link from "next/link";

const AuthLayout = (props) => {
  const router = useRouter();
  return (
    <>
      <div className="bg-white overflow-hidden">
        {/* logo */}
        <Row className="mt-[25px] md:mt-[45px] ml-[25px] md:ml-[84px] lg:ml-[165px] gap-x-4">
          <Link className="flex gap-2" href="/">
            <Image
              src="/coloredLogo.png"
              alt="loading"
              width={42.57}
              height={50}
              className="hover:cursor-pointer"
            />
            <Typography className="font-AvantGarde text-[22px] mt-4 hover:cursor-pointer">
              Family Table
            </Typography>
          </Link>
        </Row>

        {/* main content */}
        <Row className="">
          {/* left */}
          <Col
            sm={24}
            md={24}
            lg={12}
            xl={12}
            className="w-full py-10 pr-0 md:pr-[59px] lg:pr-0"
          >
            <div className="ml-[76px] relative hidden md:block">
              <Image
                src="/img/login/Rectangle.png"
                alt="loading"
                width={178}
                height={178}
                className="absolute top-0 left-0 z-0"
              />
            </div>
            <div className="ml-[20px] md:ml-[135px] mr-[20px] md:mr-[59px] md:pt-[42px]">
              {/* form here */}
              {props.children}
            </div>
          </Col>

          {/* right */}
          <Col sm={0} md={0} lg={12} xl={12} className="h-full hidden lg:block">
            <div className="w-full h-full ml-[76px] relative">
              <div className="absolute top-0 left-0 z-0">
                <Image
                  src="/img/login/dots.png"
                  alt="loading"
                  width={405}
                  height={154}
                  className="absolute top-0 left-0"
                />
              </div>
              <div className="w-full min-h-[912px] relative z-10">
                <Image
                  src="/img/login/loginImage.png"
                  alt="loading"
                  fill="relative"
                  // className="top-0 right-0"
                />
              </div>
              <div className="absolute bottom-0 left-0 z-20">
                <Image
                  src="/img/login/bottomShape.png"
                  alt="loading"
                  width={178}
                  height={178}
                  className="absolute -bottom-1 -left-[100px]"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AuthLayout;
