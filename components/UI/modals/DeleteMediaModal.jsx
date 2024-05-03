import React from "react";
import CustomModal from "../CustomModal";
import { Button, Typography } from "antd";
import { deleteMediaAsync } from "@/utils/apis/commonapi";

const DeleteMediaModal = ({
  setIsModalOpen,
  isModalOpen,
  mediaData,
  showToast,
  closeParent = () => {},
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteMedia = (mediaId, mediaType) => {
    deleteMediaAsync(mediaId, mediaType).then((res) => {
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
      title="Delete Media"
    >
      <div className="flex flex-col gap-5 mt-6">
        <div>
          <Typography className="text-[#7A7A7A] text-[16px] text-center font-AvantGardeBk">
            Are you sure you want to delete this media? You can no <br /> longer
            see that media once you delete it.
          </Typography>
        </div>
        <Button
          className="flex outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center text-[18px] rounded-lg px-[70px] py-[18px] hover:!bg-red-400 hover:!text-white hover:border-hidden leading-7 h-14 cursor-pointer transition-all ease-in-out"
          onClick={() => deleteMedia(mediaData?.id, mediaData?.media_type)}
        >
          Delete Media
        </Button>
      </div>
    </CustomModal>
  );
};

export default DeleteMediaModal;
