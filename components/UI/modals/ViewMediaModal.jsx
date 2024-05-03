import React, { useState } from "react";
import CustomModal from "../CustomModal";
import DeleteMediaModal from "../../UI/modals/DeleteMediaModal";
import CustomIcon from "../CustomIcon";
import { RxTrash } from "react-icons/rx";
import Image from "next/image"

const ViewMediaModal = ({
  setIsModalOpen,
  isModalOpen,
  mediaDetail,
  showToast,
}) => {
  const [isDeleteMediaModalOpen, setIsDeleteMediaModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <DeleteMediaModal
        isModalOpen={isDeleteMediaModalOpen}
        setIsModalOpen={setIsDeleteMediaModalOpen}
        mediaData={mediaDetail}
        showToast={showToast}
        closeParent={handleOk}
      />

      <CustomModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title=""
      >
        <div className="rounded-[8px] px-2 flex flex-col justify-center items-center">
          {mediaDetail?.media_type === 1 ? (
            <div className="modal-media">
              <Image
                style={{ margin: "auto" }}
                src={mediaDetail?.media_file}
                alt="Photo"
                width={700}
                height={400}
                className="responsive w-[700px] h-[400px]"
              />
              <div className="delete-icon">
                <CustomIcon style="md:mr-[50px] bg-[#000000]">
                  <RxTrash
                    style={{ cursor: "pointer" }}
                    size={30}
                    color="#fff"
                    onClick={() => {
                      setIsDeleteMediaModalOpen(true);
                    }}
                  />
                </CustomIcon>
              </div>
            </div>
          ) : (
            <div className="modal-media">
              <video
                style={{ margin: "auto" }}
                className="responsive w-[700px] h-[400px]"
                controls
                autoPlay
                poster={mediaDetail?.v_thumbnail}
              >
                <source src={mediaDetail?.media_file} />
              </video>
              <div className="delete-icon">
                <CustomIcon  style="w-12 h-12 md:mr-[50px]">
                  <RxTrash
                    style={{ cursor: "pointer" }}
                    size={40}
                    color="#fff"
                    onClick={() => {
                      setIsDeleteMediaModalOpen(true);
                    }}
                  />
                </CustomIcon>
              </div>
            </div>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default ViewMediaModal;
