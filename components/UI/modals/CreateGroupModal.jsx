import React, { useState } from "react";
import CustomModal from "../CustomModal";
import { Input, Typography } from "antd";
import CustomButton from "../CustomButton";
import CustomImageUpload from "../CustomImageUpload";
import { useFormik } from "formik";
import { groupSchema } from "@/utils/formik/schema";
import { addGroupAsync } from "../../../utils/apis/auth";
import { useSelector } from "react-redux";

const CreateGroupModal = ({ setIsModalOpen, isModalOpen, showToast }) => {
  const [image, setImage] = useState(null);
  const groups = useSelector((store) => store.user.groups);

  const groupFromik = useFormik({
    initialValues: {
      groupName: "",
    },
    validationSchema: groupSchema,
    onSubmit: (values) => {
      if (image) {
        if (groups.map((res) => res?.group_name).includes(values.groupName)) {
          showToast("error", "Group name already exists");
          return;
        }
        addGroupAsync({ groupName: values.groupName, img: image }).then(
          (res) => {
            if (res.status) {
              showToast("success", res.message);
              handleOk();
            } else {
              showToast("error", res.message);
            }
          }
        );
      } else {
        showToast("warning", "Please upload a pic.");
      }
    },
  });

  const handleOk = () => {
    groupFromik.handleReset();
    setImage("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    groupFromik.handleReset();
    setImage("");
    setIsModalOpen(false);
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Create New Group"
    >
      <div className="w-full flex flex-col gap-5 mt-6">
        <div className="w-full">
          <Input
            placeholder="Group Name"
            type="text"
            name="groupName"
            className="text-custom-md h-14"
            status={
              groupFromik.errors.groupName && groupFromik.touched.groupName
                ? "error"
                : ""
            }
            onChange={groupFromik.handleChange}
            onBlur={groupFromik.handleBlur}
          />
          {groupFromik.errors.groupName && groupFromik.touched.groupName && (
            <div>
              <Typography className="text-red-400">
                {groupFromik.errors.groupName}
              </Typography>
            </div>
          )}
        </div>

        <CustomImageUpload
          image={image}
          setImage={setImage}
          maxFiles={1}
          create={true}
        />
        <CustomButton onClick={groupFromik.submitForm}>Create</CustomButton>
      </div>
    </CustomModal>
  );
};

export default CreateGroupModal;
