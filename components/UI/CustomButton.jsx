import { Button } from "antd";
import React from "react";
import {useSelector} from "react-redux"
const CustomButton = (props) => {
  const isLoading = useSelector((state) => state.user.isLoading);
  return (
    <Button
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      loading={isLoading}
      className="font-AvantGarde flex outline-none border-0 justify-center items-center text-[18px] bg-primary text-white rounded-lg py-[20px] leading-7 h-14 cursor-pointer hover:!bg-[#818cf8] transition-all ease-in-out"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
