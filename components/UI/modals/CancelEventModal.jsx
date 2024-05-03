import React from "react";
import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import { Button, Typography } from "antd";
import { deleteGroupAsync, deleteMyEventAsync } from "@/utils/apis/commonapi";
import toast from "../toast";

const CancelEventModal = ({
  setIsModalOpen,
  isModalOpen,
  eventId,
  showToast,
  closeParent,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteEvent = (eventId) => {
    // api call here ...................................................................

    deleteMyEventAsync(eventId).then((res) => {
      if (res.status) {
        showToast("success", res.message);
        closeParent();
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
      title="Cancel Event"
    >
      <div className="flex flex-col gap-5 mt-6">
        <div>
          <Typography className="text-[#7A7A7A] text-[16px] text-center font-avantGarde-bk">
            Are you sure you want to cancel this event? You can not see this
            event again if once deleted.
          </Typography>
        </div>
        <Button
          className="font-avantGarde-md flex outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center text-[18px] rounded-lg px-[70px] py-[18px] hover:!bg-red-400 hover:!text-white hover:!border-hidden leading-7 h-14 cursor-pointer transition-all ease-in-out"
          onClick={() => deleteEvent(eventId)}
        >
          Cancel Event
        </Button>
      </div>
    </CustomModal>
  );
};

export default CancelEventModal;
