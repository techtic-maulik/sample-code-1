/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CustomButton from "../UI/CustomButton";
import { Input, Typography } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../utils/formik/schema";
import { resetPasswordAsync } from "../../utils/apis/auth";
import toast from "../UI/toast";
import Link from "next/link";

const ResetPassword = () => {
  const { contextHolder, showToast } = toast();
  const resetFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      resetPasswordAsync({ email: values.email }).then((res) => {
        if (res.status) {
          showToast("success", res.message);
          resetFormik.handleReset();
        } else {
          showToast("error", res.message);
        }
      });
    },
  });

  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-5 ">
        {/* form header */}
        <div className="flex flex-col gap-1">
          <Link
            className="w-fit  font-semibold text-[30px] text-[#323232] hover:cursor-pointer z-10 "
            href="/login"
          >
            <AiOutlineArrowLeft color="#797EF6" />
          </Link>
          <Typography className="text-[30px] text-[#323232] font-AvantGarde">
            Forgot Password?
          </Typography>
          <Typography className="font-midle text-custom-md text-[#323232] leading-7 font-avantGarde-bk">
            Please enter the email address associated with your account and
            we'll send you an email with instructions on how to reset your
            password.
          </Typography>
        </div>

        {/* inputs */}
        <div className="flex flex-col gap-y-8 mt-2">
          {/* email input */}
          <div>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              status={
                resetFormik.errors.email && resetFormik.touched.email
                  ? "error"
                  : ""
              }
              value={resetFormik.values.email}
              onChange={resetFormik.handleChange}
              onBlur={resetFormik.handleBlur}
              className="text-custom-md h-14"
            />
            {resetFormik.errors.email && resetFormik.touched.email && (
              <div>
                <Typography className="text-red-400">
                  {resetFormik.errors.email}
                </Typography>
              </div>
            )}
          </div>

          {/* Create Account button  */}
          <CustomButton onClick={resetFormik.submitForm}>
            Reset Password
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
