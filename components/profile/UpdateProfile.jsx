import { updateProfileAsync } from "@/utils/apis/commonapi";
import { updateProfileSchema } from "@/utils/formik/schema";
import { Button, Input, Select, Typography } from "antd";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import toast from "../UI/toast";

const UpdateProfile = ({
  UpdateProfilePic,
  initialValues,
  profilePic,
  setChangePassword,
}) => {
  const [profilePicUpdatedToggle, setProfilePicUpdatedToggle] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(
    profilePic || "/dummy-user.png"
  );
  const [profileRemove, setProfileRemove] = useState(false);

  const dispatch = useDispatch();
  const { contextHolder, showToast } = toast();
  const updateProfileFormik = useFormik({
    initialValues,
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      dispatch(
        updateProfileAsync({
          name: values.name,
          email: values.email,
          phone: values.mobile,
          country_code: values.countryCode,
          profile_pic: updatedImage,
          image_removed: profileRemove,
        })
      ).then((res) => {
        if (res.status) {
          setProfileRemove(false);
          showToast("success", res.message);
        } else {
          setProfileRemove(false);
          showToast("error", res.message);
        }
      });
    },
  });

  //   country code
  const codes = useSelector((store) => store.common.countryCodes);
  const dial_codes = codes?.map((code) => code.dial_code);
  const countryCodes = dial_codes.filter(
    (code, index) => dial_codes.indexOf(code) === index
  );

  const removeProfileHandler = () => {
    if (updatedImage !== "/dummy-user.png") {
      setProfileRemove(true);
      setUpdatedImage("/dummy-user.png");
    }
    // updateProfileFormik.submitForm();
  };

  return (
    <div>
      {contextHolder}
      <div className="rounded-full w-[110px] h-[110px] m-auto relative">
        <Image
          src={
            typeof updatedImage === "string"
              ? updatedImage
              : URL.createObjectURL(updatedImage)
          }
          fill
          alt="loading"
          className="rounded-full"
        />
        <UpdateProfilePic
          setProfilePicUpdatedToggle={setProfilePicUpdatedToggle}
          profilePicUpdatedToggle={profilePicUpdatedToggle}
          // dispatch={dispatch}
          setUpdatedImage={setUpdatedImage}
        >
          <div className="absolute right-2 bottom-2 w-[20px] h-[20px] hover:cursor-pointer flex justify-center items-center rounded-full bg-[#797EF6] border-px border-white border-solid">
            <BiPencil size="12" color="#FFF" />
          </div>
        </UpdateProfilePic>
      </div>
      <Typography
        style={{
          color: "blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => removeProfileHandler()}
      >
        Remove Profile Picture
      </Typography>

      <div className="max-w-[523px] mx-auto mt-10">
        <div className="flex flex-col gap-3">
          <Typography className="text-[18px] text-[#323232] font-avantGarde-md">
            Personal Information
          </Typography>
          {/* name input */}
          <div>
            <Input
              placeholder="Enter your name"
              type="text"
              name="name"
              value={updateProfileFormik.values.name}
              className="text-custom-md h-14"
              status={
                updateProfileFormik.errors.name &&
                updateProfileFormik.touched.name
                  ? "error"
                  : ""
              }
              onChange={updateProfileFormik.handleChange}
              onBlur={updateProfileFormik.handleBlur}
            />
            {updateProfileFormik.errors.name &&
              updateProfileFormik.touched.name && (
                <div>
                  <Typography className="text-red-400">
                    {updateProfileFormik.errors.name}
                  </Typography>
                </div>
              )}
          </div>

          {/* email input */}
          <div>
            <Input
              placeholder="Enter your email"
              type="email"
              name="email"
              value={updateProfileFormik.values.email}
              className="text-custom-md h-14"
              onChange={updateProfileFormik.handleChange}
              disabled
            />
            {updateProfileFormik.errors.email &&
              updateProfileFormik.touched.email && (
                <div>
                  <Typography className="text-red-400">
                    {updateProfileFormik.errors.email}
                  </Typography>
                </div>
              )}
          </div>

          {/* mobile number input */}
          <div>
            <div className="flex h-14 border-[1px] rounded-lg border-solid border-slate-300 hover:border-[#a6acff] transition-all ease-in-out">
              <Select
                options={countryCodes?.map((code) => {
                  return { label: code, value: code };
                })}
                value={updateProfileFormik.values.countryCode}
                style={{
                  width: "100px",
                }}
                className="flex items-mobile-code center h-14"
                bordered={false}
                onSelect={(value) => {
                  updateProfileFormik.setFieldValue("countryCode", value);
                }}
              />
              <Input
                bordered={false}
                placeholder="Enter your phone number"
                type="text"
                name="mobile"
                value={updateProfileFormik.values.mobile}
                onChange={updateProfileFormik.handleChange}
                onBlur={updateProfileFormik.handleBlur}
                className="text-custom-md border-transparent ring-transparent focus:border-transparent hover:border-transparent"
              />
            </div>
            {updateProfileFormik.errors.mobile &&
              updateProfileFormik.touched.mobile && (
                <div>
                  <Typography className="text-red-400">
                    {updateProfileFormik.errors.mobile}
                  </Typography>
                </div>
              )}
          </div>
          <div className="flex gap-4">
            <Button
              className="font-avantGarde-md flex flex-1 outline-none border-px border-primary text-primary justify-center items-center text-[18px] rounded-lg hover:!bg-primary hover:!text-white  h-14 cursor-pointer transition-all ease-in-out"
              onClick={() => setChangePassword(true)}
            >
              Change Password
            </Button>
            <Button
              className="font-avantGarde-md flex flex-1 outline-none border-px justify-center items-center text-[18px] bg-primary text-white rounded-lg   h-14 cursor-pointer hover:!bg-[#818cf8] transition-all ease-in-out"
              onClick={updateProfileFormik.submitForm}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
