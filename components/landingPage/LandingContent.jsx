import { Col, Row, Typography } from "antd";
import React from "react";
import FeatureCard from "./FeatureCard";
import Image from "next/image";
import CommonContainer from "./CommonContainer";
import About from "./About";

const LandingContent = () => {
  return (
    <div className="w-full lg:pt-[150px] flex flex-col items-center bg-white">
      <Row className="flex justify-center items-center gap-y-10 lg:bg-[url('/img/landingPage/bg.png')] bg-no-repeat bg-cover">
        {/* text container */}
        <Col md={24} lg={10} xl={12}>
          <div className="flex flex-col gap-y-7 ralative">
            <div className="hidden md:block w-[178px] h-[178px] absolute top-10 left-7 bg-[url('/img/landingPage/about-rectangle.png')] bg-no-repeat bg-cover"></div>
            <div className="m-5 md:mt-[140px] md:ml-100px md:ml-[70px]">
              <Typography className="text-[32px] md:text-[48px] text-[#323232] font-AvantGarde">
                Why Choose Us?
              </Typography>
              <Typography className="text-[20px] text-[#323232] font-normal mt-[32px]">
                Our application provides a centralized location for families to
                communicate, collaborate, and stay organized.
              </Typography>
            </div>
          </div>
        </Col>

        {/* Cards container */}
        <Col md={24} lg={14} xl={12} className="px-5 md:px-0">
          <Row className="justify-evenly lg:justify-center gap-x-10 gap-y-10 md:gap-y-0">
            <FeatureCard
              icon={"/img/landingPage/landing-card-finger.png"}
              title="Easy to Use"
              description="Our goal is to make it easy for you to stay connected with your family."
              style="lg:mt-[74px]"
            />
            <FeatureCard
              icon={"/img/landingPage/landing-card-lock.png"}
              title="Secure & Private"
              description="We us encryption and security protocols to protect your data."
            />
          </Row>
          <Row className="justify-evenly mt-10 lg:mt-0 lg:justify-center gap-x-10 gap-y-10 md:gap-y-0">
            <FeatureCard
              icon={"/img/landingPage/landing-card-secure.png"}
              title="Simple & Reliable"
              description="We provide a smooth and seamless experience to the app."
              style="lg:mt-[74px]"
            />
            <FeatureCard
              icon={"/img/landingPage/landing-card-notification.png"}
              title="Realtime Notifications"
              description="Stay updated and never miss an important message or event."
            />
          </Row>
        </Col>
      </Row>

      {/* Stay close to people container */}
      <Col className="flex flex-col w-full justify-center items-center mt-[50px] mb-[100px]">
        <CommonContainer
          image={"/img/landingPage/second-container.png"}
          title="Stay close to the people that matter to you!"
          setimgLeft
          bgColor="#F2F2FF"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. Integer dictum augue quis metus fermentum congue. Fusce bibendum scelerisque orci, in tempus felis laoreet sed."
        />

        <CommonContainer
          image={"/img/landingPage/third-container.png"}
          title="Invite new members to your group"
          bgColor="#fffff"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. Integer dictum augue quis metus fermentum congue. Fusce bibendum scelerisque orci, in tempus felis laoreet sed."
        />

        <CommonContainer
          image={"/img/landingPage/forth-container.png"}
          title="Create family events"
          bgColor="#F2F2FF"
          setimgLeft
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. Integer dictum augue quis metus fermentum congue. Fusce bibendum scelerisque orci, in tempus felis laoreet sed."
        />

        <CommonContainer
          image={"/img/landingPage/fifth-container.png"}
          title="Stay connected with your family, just a tap away!"
          bgColor="#fffff"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. Integer dictum augue quis metus fermentum congue. Fusce bibendum scelerisque orci, in tempus felis laoreet sed."
        />

        <CommonContainer
          image={"/img/landingPage/sixth-container.png"}
          title="Feel like you’re right there"
          setimgLeft
          bgColor="#F2F2FF"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac quam nisi. Donec a tincidunt metus. Quisque egestas dolor a pellentesque laoreet. Phasellus pharetra arcu urna, id volutpat mauris eleifend in. Integer dictum augue quis metus fermentum congue. Fusce bibendum scelerisque orci, in tempus felis laoreet sed."
        />
      </Col>

      <About />
    </div>
  );
};

export default LandingContent;
