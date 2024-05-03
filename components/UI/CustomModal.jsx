import { Modal, Typography } from "antd";
import React from "react";
import CustomIcon from "./CustomIcon";
import { RxCross2 } from "react-icons/rx";

const CustomModal = ({
  title,
  isModalOpen,
  handleOk,
  handleCancel,
  children,
}) => {
  return (
    <Modal
      destroyOnClose
      width={760}
      centered
      className="group-modal"
      bodyStyle={{
        marginInline: "auto",
        marginBottom: "30px",
        marginTop: "30px",
        width: "100%",
        border: "1px",
        borderRadius: "0px",
      }}
      title={
        <div className="flex justify-between items-center">
          <Typography className="flex-1 text-[24px]  font-normal text-center font-avantGarde-md ">
            {title}
          </Typography>
          <CustomIcon class="w-30 h-30" onClick={handleCancel} style="bg-[#CFCFCF] md:mr-[8px]">
            <RxCross2 size={20} color="#979797" />
          </CustomIcon>
        </div>
      }
      footer={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<></>}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
