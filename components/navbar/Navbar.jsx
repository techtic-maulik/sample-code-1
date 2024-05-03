import { Button, Drawer, Row, Typography, theme } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import Link from "next/link";
import { BiMenuAltRight } from "react-icons/bi";
import CustomDrawer from "../UI/CustomDrawer";

const Navbar = ({ isLandingPage, logo, darkTheme = true }) => {
  const { token } = theme.useToken();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <MainLayout
      layoutProps={{
        title: "",
        className: "bg-transparent",
      }}
    >
      <Row
        xs={22}
        sm={22}
        md={20}
        lg={18}
        xl={18}
        className="flex px-10 lg:px-0 lg:mx-[178px] justify-between items-center"
      >
        <Row
          className="items-end gap-2 hover:cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={logo} alt="logo" width={30.54} height={35} />
          <Typography
            className={`text-[16px] font-AvantGarde ${
              darkTheme ? "text-white" : "text-[#323232]"
            }`}
          >
            Family Table
          </Typography>
        </Row>

        {/* drawer for moble view */}
        <CustomDrawer open={open} setOpen={setOpen}>
          <div className="flex flex-col gap-4 m-5">
            <Link
              href="/"
              className={`cursor-pointer text-[#323232] hover:text-[#323232] text-[18px] font-semibold`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`cursor-pointer text-[#323232] hover:text-[#323232] text-[18px] font-semibold`}
            >
              About Us
            </Link>
            <Link
              href="/privacy-policys"
              className={`cursor-pointer text-[#323232] hover:text-[#323232] text-[18px] font-semibold`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/login"
              style={{
                fontWeight: 400,
                lineHeight: "19.18px",
                marginLeft: "-2px",
              }}
              className={`cursor-pointer text-[16px] text-white  rounded-[50px] p-0 m-0 text-[#323232] hover:text-[#323232] text-[18px] font-semibold`}
            >
              <div className="flex h-[40px]  hover:shadow-md transition-all w-[134px] rounded-[50px] text-[16px] justify-center bg-primary items-center border-solid">
                Login
              </div>
            </Link>
          </div>
        </CustomDrawer>

        {/* menu btn for mobile view */}
        <BiMenuAltRight
          size={35}
          onClick={() => setOpen(true)}
          className="block md:hidden"
        />

        {/* navigation for desktop */}
        <Row
          className={`${
            darkTheme ? "text-white" : "text-[#323232]"
          } gap-6 items-center text-[14px] font-avantGarde-md hidden md:flex`}
        >
          <Link
            href="/"
            className={`${
              isLandingPage
                ? "text-white hover:text-white"
                : "text-[#323232] hover:text-[#323232]"
            } cursor-pointer hidden md:block`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${
              isLandingPage
                ? "text-white hover:text-white"
                : "text-[#323232] hover:text-[#323232]"
            } cursor-pointer hidden md:block`}
          >
            About Us
          </Link>
          <Link
            href="/privacy-policys"
            className={`${
              isLandingPage
                ? "text-white hover:text-white"
                : "text-[#323232] hover:text-[#323232]"
            } cursor-pointer hidden md:block`}
          >
            Privacy Policy
          </Link>
          <Link href="/login">
            <Button
              className={`w-[134px] text-[16px] h-[40px] p-0 m-0 rounded-[50px] items-center justify-center cursor-pointer flex ${
                !isLandingPage ? "hover:!bg-[#69b1ff] bg-primary" : ""
              } hover:shadow-md transition-all`}
              style={{
                fontWeight: 400,
                lineHeight: "19.18px",
              }}
            >
              <Typography
                className={` font-avantGarde-md ${
                  !isLandingPage ? "text-white" : "text-primary"
                } text-[16px]`}
              >
                Login
              </Typography>
            </Button>
          </Link>
        </Row>
      </Row>
    </MainLayout>
  );
};

export default Navbar;
