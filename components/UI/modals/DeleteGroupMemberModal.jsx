import React from "react";
import CustomModal from "../CustomModal";
import {Button, Typography} from "antd";
import { deleteGroupMemberAsync } from "@/utils/apis/commonapi";

const DeleteGroupMemberModal = ({
  setIsModalOpen,
  isModalOpen,
  memberId,
  showToast,
  closeParent = () => {},
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteGroupMember = (memberId) => {
    deleteGroupMemberAsync(memberId).then((res) => {
      if (res.status) {
        showToast("success", res.message);
        //closeParent();
        handleOk();
      } else {
        showToast("error", res.message);
      }
    });
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Delete Member"
    >
      <div className="flex flex-col gap-5 mt-6">
        <div>
          <Typography className="text-[#7A7A7A] text-[16px] text-center font-avantGarde-bk">
            Are you sure you want to delete this member?
          </Typography>
        </div>
        <Button
          className="font-avantGarde-md flex outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center text-[18px] rounded-lg px-[70px] py-[18px] hover:!bg-red-400 hover:!text-white hover:!border-hidden leading-7 h-14 cursor-pointer transition-all ease-in-out"
          onClick={() => deleteGroupMember(memberId)}
        >
          Delete Member
        </Button>
      </div>
    </CustomModal>
  );
};

export default DeleteGroupMemberModal;
