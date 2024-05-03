import React, { useEffect, useState } from "react";
import { Button, Col, Row, Typography, theme } from "antd";
import Navbar from "../components/navbar/Navbar";
import InfoCard from "../components/about/InfoCard";
import Image from "next/image";
import FaqContainer from "../components/about/FaqContainer";
import About from "../components/landingPage/About";
import Footer from "../components/layout/Footer";

const AboutPage = () => {
  const { token } = theme.useToken();
  const [faqKey, setFaqKey] = useState(0);


  const teamData = [
    {
      picture: "/img/about/teamMembers/person-1.png",
      name: "Name of Person",
      duty: "Duty within the company",
    },
    {
      picture: "/img/about/teamMembers/person-2.png",
      name: "Name of Person",
      duty: "Duty within the company",
    },
    {
      picture: "/img/about/teamMembers/person-3.png",
      name: "Name of Person",
      duty: "Duty within the company",
    },
  ];

  return (
    <>
      <Col className={`flex flex-col w-full overflow-hidden bg-white`}>
        <Row gutter={24} className="mx-auto mt-[38px]">
          <Navbar logo="/img/header/darkLogo.png" darkTheme={false} />
        </Row>

        {/* Title Container */}
        <Row
          className="mt-[30px] w-full h-[221px] flex flex-row items-center pl-5 lg:pl-0 lg:justify-between relative"
          style={{ backgroundColor: token.colorPrimary, lineHeight: "65px" }}
        >
          <Typography className="text-[50px] font-AvantGarde text-white lg:ml-[165px] ml-0">
            About Us
            <Typography className="font-normal text-white text-[21px] font-avantGarde-bk lg:w-[620px] w-full">
              Family Table is designed to make it easy for families to stay
              connected and organized.
            </Typography>
          </Typography>
          <div
            className="w-[405px] h-[154px] bg-cover hidden md:block absolute top-8 right-2"
            style={{
              backgroundImage: `url("/img/about/heading-dots-container.png")`,
            }}
          ></div>
        </Row>

        {/* First Container */}
        <Row className="w-full flex flex-col lg:flex-row items-center justify-between mt-[100px]">
          {/* Left Image */}
          <Col lg={12} md={24} className="flex justify-end lg:pr-10">
            <Image
              src="/img/about/container-one-img.png"
              alt="group-img"
              width={499}
              height={529}
              className="lg:w-[499px] w-[300px] lg:h-[529px] h-[325px]"
            />
          </Col>
          {/* Content */}
          <Col
            lg={12}
            md={24}
            className="flex flex-col gap-10 px-5 mt-5 lg:pr-[165px]"
          >
            <Typography className="text-[38px] text-[#323232] text-center lg:text-left font-AvantGarde mobiel-view-font ">
              Stay close to the people that matter to you!
            </Typography>
            <Typography className="text-[16px] text-[#979797] font-avantGarde-bk text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a
              pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat
              mauris eleifend in. Integer dictum augue quis metus fermentum
              congue. Fusce bibendum scelerisque orci, in tempus felis laoreet
              sed.
            </Typography>
            <Button className="hover:!text-white hover:!bg-[#818cf8] font-AvantGarde flex justify-center items-center w-[134px] h-[45px] text-[16px] rounded-full  border-primary text-white bg-primary">
              Learn More
            </Button>
          </Col>
        </Row>

        <Col
          span={24}
          className="bg-[#F2F2FF] px-[20px] md:px-[75px] lg:px-[162px] py-[60px] mt-[85px]"
        >
          <Typography
            className="md:w-[550px] w-fit text-[38px] text-[#323232] font-AvantGarde mobiel-view-font"
            style={{ lineHeight: "130%" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>

          <Row gutter={24} className="mt-[80px]">
            <InfoCard
              image="/img/about/box-search.png"
              title="Easy to Use"
              description="Our goal is to make it easy for you to stay connected with your family."
            />
            <InfoCard
              image="/img/about/lockImage.png"
              title="Secure & Private"
              description="We use encryption and security protocols to protect your data."
            />
            <InfoCard
              image="/img/about/protectedImage.png"
              title="Simple & Reliable"
              description="We provide a smooth and seamless experience to the app."
            />
            <InfoCard
              image="/img/about/chart-square.png"
              title="Realtime Notifications"
              description="Stay updated and never miss an important message or event."
            />
          </Row>
        </Col>

        <Col sm={24} md={20} className="md:mt-[100px] mx-auto">
          <Typography className="font-AvantGarde w-fit text-[38px] text-[#323232] mx-auto my-[30px] md:my-0  mobiel-view-font">
            Meet Our Team
          </Typography>
          <Col className="flex flex-row gap-[53px] flex-wrap">
            {teamData?.map((data, i) => {
              return (
                <Col
                  key={i}
                  className="flex flex-col items-center mx-auto gap-[7px] md:mt-[80px]"
                >
                  <Image
                    src={data?.picture}
                    width={336.33}
                    height={306}
                    alt={data?.name}
                  />
                  <Typography
                    className="text-[22px] text-[#323232] font-AvantGarde"
                    style={{ lineHeight: "26.37px", fontWeight: 400 }}
                  >
                    {data?.name}
                  </Typography>
                  <Typography className="text-[14px] text-[#7A7A7A] font-avantGarde-bk">
                    {data?.duty}
                  </Typography>
                </Col>
              );
            })}
          </Col>
        </Col>

        <Col
          span={24}
          className="mt-[50px] md:mt-[100px] bg-[#F2F2FF] px-[30px] md:px-[81px] lg:px-[162px] py-[60px]"
        >
          <Typography className="text-[38px] text-[#323232] font-AvantGarde mobiel-view-font">
            Common FAQs
          </Typography>
          <Col span={24} className="flex flex-col">
            {/* Info Container */}
            <FaqContainer
              datakey={1}
              faqKey={faqKey}
              setFaqKey={setFaqKey}
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. "
            />
            <div className="w-full h-[1px] bg-[#C4C4C4]"></div>
            <FaqContainer
              datakey={2}
              faqKey={faqKey}
              setFaqKey={setFaqKey}
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. "
            />
            <div className="w-full h-[1px] bg-[#C4C4C4]"></div>
            <FaqContainer
              datakey={3}
              faqKey={faqKey}
              setFaqKey={setFaqKey}
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. "
            />
            <div className="w-full h-[1px] bg-[#C4C4C4]"></div>
            <FaqContainer
              datakey={4}
              faqKey={faqKey}
              setFaqKey={setFaqKey}
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. "
            />
            <div className="w-full h-[1px] bg-[#C4C4C4]"></div>
            <FaqContainer
              datakey={5}
              faqKey={faqKey}
              setFaqKey={setFaqKey}
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. "
            />
          </Col>
        </Col>

        <About />
        <Footer />
      </Col>{" "}
    </>
  );
};

export default AboutPage;
