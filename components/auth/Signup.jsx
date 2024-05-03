import { Checkbox, Image, Input, Select, Space, Typography } from "antd";
import React, { useState, useRef } from "react";
import Link from "next/link";
import CustomButton from "../UI/CustomButton";
import { useFormik } from "formik";
import { signupSchema } from "../../utils/formik/schema";
import { useDispatch, useSelector } from "react-redux";
import { signupAsync } from "../../utils/apis/auth";
import { useRouter } from "next/router";
import toast from "../UI/toast";
import { userAction } from "@/store/slices/userSlice";

const Signup = () => {
  // required functions
  const dispatch = useDispatch();
  const router = useRouter();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const passwordInputRef = useRef();
  const confPasswordInputRef = useRef();

  // local states
  const [checkTerms, setCheckTerms] = useState(false);
  const [checkTermsHasError, setCheckTermsHasError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setConfShowPassword] = useState(false);
  const { contextHolder, showToast } = toast();

  const codes = useSelector((store) => store.common.countryCodes);
  const dial_codes = codes?.map((code) => code.dial_code);
  const countryCodes = dial_codes.filter(
    (code, index) => dial_codes.indexOf(code) === index
  );

  const handleFocusNextField = (e) => {
    if (e.key === "Enter" && e.target.name === "name") {
      emailInputRef.current.focus();
    }
    if (e.key === "Enter" && e.target.name === "email") {
      phoneInputRef.current.focus();
    }
    if (e.key === "Enter" && e.target.name === "phone") {
      passwordInputRef.current.focus();
    }
    if (e.key === "Enter" && e.target.name === "password") {
      confPasswordInputRef.current.focus();
    }
    if (e.key === "Enter" && e.target.name === "confPassword") {
      signupFormik.submitForm();
    }
  };

  // Formik and yup validation
  const signupFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confPassword: "",
      country_code: "+91",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      if (checkTerms) {
        // Call api here
        setCheckTermsHasError("");
        const data = {
          name: values.name,
          email: values.email,
          password: values.password,
          country_code: values.country_code,
          phone: values.phone,
        };
        dispatch(signupAsync(data)).then((res) => {
          if (res.status) {
            showToast("success", res.message);
            setTimeout(() => {
              router.push("/dashboard");
              res.dispatch(userAction.setUser(res.response));
            }, 1000);
          } else {
            showToast("error", res.message);
          }
        });
      } else {
        setCheckTermsHasError("Please check terms & conditions ");
      }
    },
  });
  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-5">
        {/* form header */}
        <div className="flex flex-col gap-1">
          <Typography className="text-[30px] text-[#323232] hidden md:block font-avantGarde-md">
            Hey There! Are you new here?
          </Typography>
          <Typography className="text-[30px] text-[#323232] block md:hidden font-avantGarde-md">
            Sign Up
          </Typography>
          <Typography className=" font-midle text-custom-md text-[#323232] leading-7 hidden md:block font-avantGarde-md">
            Please enter the details below to create your new account. We do not
            share your personal details with others.
          </Typography>
          <Typography className=" font-midle text-custom-md text-[#323232] leading-7 block md:hidden font-avantGarde-md">
            Create new account
          </Typography>
        </div>

        {/* inputs */}
        <div className="flex flex-col gap-y-5 lg:gap-y-2 xl:gap-y-5 mt-6">
          <div>
            <Input
              placeholder="Name"
              type="text"
              name="name"
              status={
                signupFormik.errors.name && signupFormik.touched.name
                  ? "error"
                  : ""
              }
              ref={nameInputRef}
              value={signupFormik.values.name}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              onKeyDown={handleFocusNextField}
              className="text-custom-md h-14"
            />
            {signupFormik.errors.name && signupFormik.touched.name && (
              <div>
                <Typography className="text-red-400">
                  {signupFormik.errors.name}
                </Typography>
              </div>
            )}
          </div>

          {/* email input */}
          <div>
            <Input
              placeholder="Email Address"
              type="email"
              name="email"
              status={
                signupFormik.errors.email && signupFormik.touched.email
                  ? "error"
                  : ""
              }
              ref={emailInputRef}
              value={signupFormik.values.email}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              onKeyDown={handleFocusNextField}
              className="text-custom-md h-14 "
            />
            {signupFormik.errors.email && signupFormik.touched.email && (
              <div>
                <Typography className="text-red-400">
                  {signupFormik.errors.email}
                </Typography>
              </div>
            )}
          </div>

          {/* phone number input */}
          <div>
            <div className="flex h-14 border-[1px] rounded-lg border-solid border-slate-300 hover:border-[#a6acff] transition-all ease-in-out">
              <Select
                options={countryCodes?.map((code) => {
                  return {
                    label: code,
                    value: code,
                  };
                })}
                virtual={true}
                className="flex items-center mobile-code h-14"
                value={signupFormik.values.country_code}
                bordered={false}
                style={{
                  width: "100px",
                }}
                onSelect={(value) =>
                  signupFormik.setFieldValue("country_code", value)
                }
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
              />
              <Input
                placeholder="Mobile"
                type="text"
                name="phone"
                status={
                  signupFormik.errors.phone && signupFormik.touched.phone
                    ? "error"
                    : ""
                }
                value={signupFormik.values.phone}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                ref={phoneInputRef}
                onKeyDown={handleFocusNextField}
                className="text-custom-md border-transparent ring-transparent focus:border-transparent hover:border-transparent"
              />
            </div>
            {signupFormik.errors.phone && signupFormik.touched.phone && (
              <div>
                <Typography className="text-red-400">
                  {signupFormik.errors.phone}
                </Typography>
              </div>
            )}
          </div>
          {/* password input */}
          <div>
            <Input.Password
              ref={passwordInputRef}
              placeholder="Password"
              type="password"
              name="password"
              status={
                signupFormik.errors.password && signupFormik.touched.password
                  ? "error"
                  : ""
              }
              visibilityToggle={{
                visible: showPassword,
                onVisibleChange: setShowPassword,
              }}
              value={signupFormik.values.password}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              onKeyDown={handleFocusNextField}
              className="text-custom-md h-14"
            />
            {signupFormik.errors.password && signupFormik.touched.password && (
              <div>
                <Typography className="text-red-400">
                  {signupFormik.errors.password}
                </Typography>
              </div>
            )}
          </div>

          {/* conform password input */}
          <div>
            <Input.Password
              ref={confPasswordInputRef}
              placeholder="Confirm password"
              type="password"
              name="confPassword"
              status={
                signupFormik.errors.confPassword &&
                signupFormik.touched.confPassword
                  ? "error"
                  : ""
              }
              visibilityToggle={{
                visible: showConfPassword,
                onVisibleChange: setConfShowPassword,
              }}
              value={signupFormik.values.confPassword}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
              onKeyDown={handleFocusNextField}
              className="text-custom-md h-14"
            />
            {signupFormik.errors.confPassword &&
              signupFormik.touched.confPassword && (
                <div>
                  <Typography className="text-red-400">
                    {signupFormik.errors.confPassword}
                  </Typography>
                </div>
              )}
          </div>

          {/* checkbox */}
          <div className="flex">
            <Checkbox
              value={checkTerms}
              onChange={(e) => {
                setCheckTerms(e.target.checked);
              }}
              className="ant-checkbox-inner font-avantGarde-md"
            >
              By clicking I agree to all the
              <Link
                className="ml-1 !text-primary hover:!text-[#69b1ff] text-custom-sm md:text-[14px] font-avantGarde-md"
                href={"/privacy-policys"}
                target="_blank"
              >
                Terms & Conditions
              </Link>
            </Checkbox>
            {checkTermsHasError && !checkTerms && (
              <Typography className="text-red-400">
                {checkTermsHasError}
              </Typography>
            )}
          </div>

          {/* Create Account button  */}
          <CustomButton
            onClick={() => {
              if (!checkTerms) {
                setCheckTermsHasError("Please check terms & conditions ");
              }
              signupFormik.submitForm();
            }}
          >
            Create Account
          </CustomButton>
        </div>

        {/* login link */}
        <div className="flex justify-center items-center gap-2.5 mt-7">
          <Typography className="font-avantGarde-md text-custom-md text-[#323232]">
            Already have an account?
          </Typography>
          <Typography className="flex justify-end text-custom-md">
            <Link
              className="font-avantGarde-md !text-primary hover:!text-[#69b1ff]"
              href={"/login"}
            >
              Login
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Signup;
