import { Drawer, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CustomDrawer = ({ children, open, setOpen }) => {
  const [placement, setPlacement] = useState("left");
  const router = useRouter();

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Drawer
        title={
          <Row
            className="items-end gap-2 hover:cursor-pointer"
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
        }
        width={300}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        bodyStyle={{
          padding: "0px",
        }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
