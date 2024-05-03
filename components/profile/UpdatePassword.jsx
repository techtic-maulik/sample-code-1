import { Button, Input, Typography } from "antd";
import React from "react";
import CustomIcon from "../UI/CustomIcon";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useFormik } from "formik";
import { updatePasswordSchema } from "../../utils/formik/schema";
import { useState } from "react";
import { changePasswordAsync } from "../../utils/apis/commonapi";
import toast from "../UI/toast";

const UpdatePassword = ({ setChangePassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const { contextHolder, showToast } = toast();

  const updatePasswordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: (values) => {
      changePasswordAsync({
        old_password: values.oldPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
      }).then((res) => {
        if (res.status) {
          showToast("success", res.message);
        } else {
          showToast("error", res.message);
        }
      });
    },
  });

  return (
    <div>
      {contextHolder}
      <div className="flex gap-2">
        <div onClick={() => setChangePassword(false)}>
          <CustomIcon>
            <AiOutlineArrowLeft size="25" color="#797EF6" />
          </CustomIcon>
        </div>
        <Typography className="text-[24px]  font-avantGarde-md text-[#323232]">
          Change Password
        </Typography>
      </div>
      <div className="max-w-[523px] mx-auto mt-10">
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <div>
              <Input
                placeholder="Current Password"
                type="text"
                name="oldPassword"
                value={updatePasswordFormik.values.oldPassword}
                className="text-custom-md h-14"
                status={
                  updatePasswordFormik.errors.oldPassword &&
                  updatePasswordFormik.touched.oldPassword
                    ? "error"
                    : ""
                }
                onChange={updatePasswordFormik.handleChange}
                onBlur={updatePasswordFormik.handleBlur}
              />
              {updatePasswordFormik.errors.oldPassword &&
                updatePasswordFormik.touched.oldPassword && (
                  <div>
                    <Typography className="text-red-400">
                      {updatePasswordFormik.errors.oldPassword}
                    </Typography>
                  </div>
                )}
            </div>

            <div>
              <Input.Password
                placeholder="New Password"
                type="text"
                name="newPassword"
                value={updatePasswordFormik.values.newPassword}
                className="text-custom-md h-14"
                visibilityToggle={{
                  visible: showPassword,
                  onVisibleChange: setShowPassword,
                }}
                status={
                  updatePasswordFormik.errors.newPassword &&
                  updatePasswordFormik.touched.newPassword
                    ? "error"
                    : ""
                }
                onChange={updatePasswordFormik.handleChange}
                onBlur={updatePasswordFormik.handleBlur}
              />
              {updatePasswordFormik.errors.newPassword &&
                updatePasswordFormik.touched.newPassword && (
                  <div>
                    <Typography className="text-red-400">
                      {updatePasswordFormik.errors.newPassword}
                    </Typography>
                  </div>
                )}
            </div>

            <div>
              <Input.Password
                placeholder="Confirm New Password"
                type="text"
                name="confirmPassword"
                className="text-custom-md h-14"
                value={updatePasswordFormik.values.confirmPassword}
                status={
                  updatePasswordFormik.errors.confirmPassword &&
                  updatePasswordFormik.touched.confirmPassword
                    ? "error"
                    : ""
                }
                visibilityToggle={{
                  visible: showConfPassword,
                  onVisibleChange: setShowConfPassword,
                }}
                onChange={updatePasswordFormik.handleChange}
                onBlur={updatePasswordFormik.handleBlur}
              />
              {updatePasswordFormik.errors.confirmPassword &&
                updatePasswordFormik.touched.confirmPassword && (
                  <div>
                    <Typography className="text-red-400">
                      {updatePasswordFormik.errors.confirmPassword}
                    </Typography>
                  </div>
                )}
            </div>
          </div>
          <div className="mt-28 flex">
            <Button
              className="flex flex-1 outline-none border-0 justify-center items-center text-[18px] bg-primary text-white rounded-lg py-[18px] px-[70px] leading-7 h-14 cursor-pointer hover:!bg-[#818cf8] transition-all ease-in-out"
              onClick={updatePasswordFormik.submitForm}
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
