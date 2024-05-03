import React from "react";

const CustomCard = (props) => {
  return (
    <div className="border-px pt-1 md:p-7 rounded-[32px] bg-[#FFFFFF] w-full h-full">
      {props.children}
    </div>
  );
};

export default CustomCard;
