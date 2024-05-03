import React, { useState } from "react";
import CustomModal from "../CustomModal";
import CustomButton from "../CustomButton";
import CustomImageUpload from "../CustomImageUpload";
import { addMediaAsync } from "@/utils/apis/commonapi";
const AddMediaModal = ({ setIsModalOpen, isModalOpen, groupId, showToast }) => {
  const [image, setImage] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);

  const handleOk = () => {
    let isValid = false;
    let media_type = 1; //image

    if (
      image !== ("" || null) &&
      image.type.includes("video") &&
      videoThumbnail === ("" || null)
    ) {
      showToast("error", "Upload video thumbnail image");
    }

    if (image !== ("" || null) && image.type.includes("image")) {
      media_type = image.type.includes("video") ? 2 : 1;
      isValid = true;
    } else if (
      image !== ("" || null) &&
      image.type.includes("video") &&
      videoThumbnail !== ("" || null)
    ) {
      media_type = image.type.includes("video") ? 2 : 1;
      isValid = true;
    }
    if (isValid) {
      addMediaAsync({
        group_id: groupId,
        media_file: image,
        media_type: media_type,
        v_thumbnail: videoThumbnail,
      }).then((res) => {
        if (res.status) {
          showToast("success", res.message);
        } else {
          showToast("error", res.message);
        }
        setImage(null);
        setVideoThumbnail(null);
        setIsModalOpen(false);
      });
    }
  };

  const handleCancel = () => {
    setImage(null);
    setVideoThumbnail(null);
    setIsModalOpen(false);
  };
  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Add New Post"
    >
      <div className="flex flex-col gap-5 mt-6">
        <CustomImageUpload
          image={image}
          setImage={setImage}
          maxFiles={1}
          videoThumbnail={videoThumbnail}
          setVideoThumbnail={setVideoThumbnail}
          create={false}
          description={"Upload Picture or Video"}
          errorMessage="photos and videos should be less than 5 MB."
        />
        <CustomButton onClick={() => handleOk()}>Add</CustomButton>
      </div>
    </CustomModal>
  );
};

export default AddMediaModal;
