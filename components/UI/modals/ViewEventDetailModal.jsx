import React, { useState } from "react";
import CustomModal from "../CustomModal";
import Image from "next/image";
import { Button, Typography } from "antd";
import EditEventModal from "./EditEventModal";
import CancelEventModal from "./CancelEventModal";
import { useSelector } from "react-redux";
import CreateNewEventModal from "./CreateNewEventModal";

const ViewEventDetailModal = ({
  setIsModalOpen,
  isModalOpen,
  event,
  showToast,
}) => {
  const [isEditEventOpen, setIsEditEventModalOpen] = useState(false);
  const [isCancelEventOpen, setIsCancelEventModalOpen] = useState(false);
  const user = useSelector((store) => store.user.user);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Event Details"
    >
      {/* here CreateNewEventModal modal used for update event */}
      <CreateNewEventModal
        isModalOpen={isEditEventOpen}
        setIsModalOpen={setIsEditEventModalOpen}
        event={event}
        showToast={showToast}
      />
      <CancelEventModal
        isModalOpen={isCancelEventOpen}
        setIsModalOpen={setIsCancelEventModalOpen}
        eventId={event?.id}
        showToast={showToast}
        closeParent={handleOk}
      />
      {/* border-[1px] border-[#d9d9d9] border-solid */}
      <div className="relative h-[242px] rounded-[8px]  flex flex-col justify-center items-center">
        <img
          src={event?.event_pic}
          height="271px"
          style={{ width: "-webkit-fill-available", borderRadius: "25px" }}
        />
        {/* <Image
          src={event?.event_pic}
          fill
          // width={200}
          // height={200}
          alt="loading"
          className="fileUpload rounded-[8px]"
        /> */}
      </div>
      <div className="flex justify-between mt-10">
        <Typography className="text-[18px] text-[400] text-[#323232] font-avantGarde-md">
          {event?.event_name}
        </Typography>
        <Typography className="uppercase font-bold text-[#797EF6] text-[14px] font-avantGarde-bk">
          {event?.category}
        </Typography>
      </div>
      <div className="mt-1">
        <Typography className="text-[#7A7A7A] text-[14px]">
          {event?.event_date}
        </Typography>
        <Typography className="text-[#7A7A7A] text-[16px] text-justify mt-2 font-avantGarde-bk">
          {event?.event_details}
        </Typography>
      </div>
      {user?.id === event?.user_id && (
        <div className="flex justify-center gap-4 mt-10 mobile-buttons">
          <Button
            className="w-full font-avantGarde-md flex outline-none border-0 justify-center items-center text-[18px] bg-primary text-white rounded-lg py-[18px] px-[70px]  leading-7 h-14 cursor-pointer hover:!bg-[#818cf8] transition-all ease-in-out"
            onClick={() => {
              setIsEditEventModalOpen(true);
            }}
          >
            Edit Event
          </Button>
          <Button
            className="font-avantGarde-md flex outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center text-[18px] rounded-lg px-[70px] py-[18px] hover:!bg-red-400 hover:!text-white leading-7 h-14 cursor-pointer transition-all ease-in-out"
            onClick={() => setIsCancelEventModalOpen(true)}
          >
            Cancel Event
          </Button>
        </div>
      )}
    </CustomModal>
  );
};

export default ViewEventDetailModal;
