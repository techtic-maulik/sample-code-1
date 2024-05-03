import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import SearchBar from "../layout/SearchBar";
import { Button, Col, Drawer, Row, Typography } from "antd";
import Image from "next/image";
import SidebarNavs from "../layout/SidebarNavs";
import { BiMenuAltRight } from "react-icons/bi";
import CustomDrawer from "../UI/CustomDrawer";
import { useRouter } from "next/router";
import toast from "../UI/toast";
import { useSelector } from "react-redux";

const DashboardLayout = (props) => {
  const { contextHolder, showToast } = toast();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const groups = useSelector((store) => store.user.groups);

  const groupEmpty = () => {
    showToast("error", "Please create a group and then upload the media");
  };

  return (
    <>
      {contextHolder}
      {/* drawer for mobile navigation */}
      <CustomDrawer open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-4 p-0">
          <Sidebar />
        </div>
      </CustomDrawer>

      {/* sidebar for mobile view */}
      <Row className="min-h-screen w-full bg-[#F5F5FF] md:hidden">
        <div className="w-full flex justify-between bg-white p-5 h-[75px]">
          <Row
            className="items-end gap-1 hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/img/header/darkLogo.png"
              alt="logo"
              width={30.54}
              height={35}
            />
            <Typography
              className={`text-[16px] leading-3 font-AvantGarde text-[#323232]`}
            >
              Family Table
            </Typography>
          </Row>
          <SearchBar />
          {/* menu for mobile view */}
          <BiMenuAltRight
            size={35}
            onClick={() => setOpen(true)}
            className="block md:hidden"
          />
        </div>

        {/* content for mobile view */}
        <Row className="w-full">
          {props.children ? (
            <div className="w-full flex flex-wrap gap-3 mt-[32px] overflow-y-auto scroll-hidden">
              {/* content  */}
              {props.children}
            </div>
          ) : (
            props && (
              <div className="mobile-res w-full h-full flex flex-col justify-center items-center mt-[-80px] sm:mt-0">
                <Image
                  src={props.emptyImage}
                  alt="loading"
                  width={270}
                  height={270}
                />
                <Typography className="flex justify-center text-center text-[30px] text-[#323232] font-AvantGarde">
                  {props.title}
                </Typography>
                {props.description === "photos" ? (
                  <Typography className="text-base w-[577px] text-center mt-2 font-AvantGarde mobile-view-des  px-3 md:px-0">
                    You don’t have anything to show. You can add photos and
                    videos of your families here.
                  </Typography>
                ) : (
                  <Typography className="text-base w-[577px] text-center mt-2 font-AvantGarde mobile-view-des px-3 md:px-0">
                    {props.description}
                  </Typography>
                )}
                {props.buttonText === "Create Group" && (
                  <Button
                    onClick={() => props.setIsGroupModalOpen(true)}
                    className="w-[150px] mt-9 h-8 rounded-2xl text-white opacity-1 hover:opacity-1 border-primary bg-primary font-AvantGarde"
                  >
                    {props.buttonText}
                  </Button>
                )}
                {props.buttonText === "Upload Media" && (
                  <Button
                    onClick={() => {
                      if (groups.length === 0) {
                        groupEmpty();
                      }
                    }}
                    className="w-[150px] mt-9 h-8 rounded-2xl text-white opacity-1 hover:opacity-1 border-primary bg-primary font-AvantGarde"
                  >
                    {props.buttonText}
                  </Button>
                )}
              </div>
            )
          )}
        </Row>
      </Row>

      {/* sidebar fro Desktop view */}
      <Row className="min-h-screen bg-[#F5F5FF] hidden md:flex">
        {/* left sidebar for desktop view */}
        <Col md={7} lg={5} className="hidden md:flex">
          <Sidebar />
        </Col>

        {/* right container */}
        {/* for desktop view */}
        <Col
          md={17}
          lg={19}
          className="hidden md:flex flex-col pt-10 px-12 w-full"
        >
          <SearchBar />

          {/* dashboard container */}
          {props.children ? (
            <div className="w-full flex flex-wrap gap-3 mt-8  overflow-y-auto scroll-hidden">
              {/* content  */}
              {props.children}
            </div>
          ) : (
            props && (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <Image
                  src={props.emptyImage}
                  alt="loading"
                  width={270}
                  height={270}
                />
                <Typography className="flex justify-center text-center text-[30px] text-[#323232] font-avantGarde-md">
                  {props.title}
                </Typography>
                {props.description === "photos" ? (
                  <Typography className="flex justify-center text-[16px] text-[#323232] w-[577px] text-center mt-2 font-avantGarde-bk mobile-view-des">
                    You don’t have anything to show. You can add photos and
                    videos of your <br /> families here.
                  </Typography>
                ) : (
                  <Typography className="flex justify-center text-[16px] text-[#323232]  text-center mt-2 font-avantGarde-bk mobile-view-des">
                    {props.description}
                  </Typography>
                )}
                {props.buttonText === "Create Group" && (
                  <Button
                    onClick={() => props.setIsGroupModalOpen(true)}
                    className="w-[150px] mt-9 h-8 rounded-2xl !text-white opacity-1 hover:!bg-[#818cf8] hover:opacity-1 border-primary bg-primary font-AvantGarde"
                  >
                    {props.buttonText}
                  </Button>
                )}
                {props.buttonText === "Upload Media" && (
                  <Button
                    onClick={() => {
                      if (groups.length === 0) {
                        groupEmpty();
                      }
                    }}
                    className="w-[150px] mt-9 h-8 rounded-2xl !text-white opacity-1 hover:!bg-[#818cf8] hover:opacity-1 border-primary bg-primary font-AvantGarde"
                  >
                    {props.buttonText}
                  </Button>
                )}
              </div>
            )
          )}
        </Col>

        {/* for mobile view */}
        <Col></Col>
      </Row>
    </>
  );
};

export default DashboardLayout;
