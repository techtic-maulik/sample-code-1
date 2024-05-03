import { Form, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "../UI/CustomButton";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/formik/schema";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../utils/apis/auth";
import toast from "../UI/toast";
import { useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { socialLogin } from "../../utils/apis/sociallogin";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const { contextHolder, showToast } = toast();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      dispatch(loginAsync(data)).then((res) => {
        if (res.status) {
          showToast("error", res.message);
          router.push("/dashboard");
        } else {
          showToast("error", "Incorrect email address or password");
        }
      });
    },
  });

  const loginUsingGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      try {
        dispatch(socialLogin(tokenResponse.access_token, "google")).then(() =>
          router.push("/dashboard")
        );
      } catch (err) {
        showToast("error", err.message);
      }
    },
    onError: (error) => showToast("Failed", error),
  });

  const responseFacebook = (response) => {
    try {
      dispatch(socialLogin(response.accessToken, "facebook")).then(() =>
        router.push("/dashboard")
      );
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-1">
          <Typography className="font-normal text-[30px] text-[#323232] font-avantGarde-md ">
            Welcome Back!
          </Typography>
          <Typography className="font-midle text-custom-md text-[#323232] leading-7 hidden md:block font-avantGarde-md">
            Please enter your email and password to login your account. If you
            don&apos;t have an account yet, click on the &quot;Sign up&quot;
            button to create one.
          </Typography>
          <Typography className="font-midle text-custom-md text-[#323232] leading-7 block md:hidden font-avantGarde-md">
            Login to continue
          </Typography>
        </div>
        <div className="flex flex-col gap-5 mt-6">
          <div>
            <Input
              placeholder="Email Address"
              type="email"
              name="email"
              ref={emailInputRef}
              className="text-custom-md h-14"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  passwordInputRef.current.focus();
                }
              }}
              status={
                loginFormik.errors.email && loginFormik.touched.email
                  ? "error"
                  : ""
              }
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
            />
            {loginFormik.errors.email && loginFormik.touched.email && (
              <div>
                <Typography className="text-red-400">
                  {loginFormik.errors.email}
                </Typography>
              </div>
            )}
          </div>
          <div>
            <Input.Password
              placeholder="Password"
              type="password"
              name="password"
              ref={passwordInputRef}
              className="text-custom-md h-14"
              status={
                loginFormik.errors.password && loginFormik.touched.password
                  ? "error"
                  : ""
              }
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loginFormik.submitForm();
                }
              }}
            />
            {loginFormik.errors.password && loginFormik.touched.password && (
              <div>
                <Typography className="text-red-400">
                  {loginFormik.errors.password}
                </Typography>
              </div>
            )}
          </div>

          <Typography className="flex justify-end">
            <Link
              className="!text-primary hover:!text-[#69b1ff] text-custom-md font-avantGarde-md"
              href={"/resetpassword"}
              onClick={() => router.push("/resetpassword")}
            >
              Forgot your password?
            </Link>
          </Typography>

          <CustomButton onClick={loginFormik.submitForm}>Login</CustomButton>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="bg-[#7A7A7A] h-px flex-1"></div>
          <Typography className="font-midle text-[18px] text-[#7A7A7A] font-avantGarde-md">
            Or continue with
          </Typography>
          <div className="bg-[#7A7A7A] h-px flex-1"></div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-x-7">
            {/* <Image
              src="/img/login/appleIcon.png"
              alt="loading"
              width={52}
              height={52}
              className="cursor-pointer"
              onClick={() => {}}
            /> */}

            {/* <FacebookLogin
              appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
              callback={responseFacebook}
              render={(renderProps) => (
                <Image
                  onClick={renderProps.onClick}
                  src="/img/login/fbIcon.png"
                  alt="loading"
                  width={52}
                  className="cursor-pointer"
                  height={52}
                />
              )}
            /> */}
            <Image
              src="/img/login/googleIcon.png"
              alt="loading"
              width={52}
              className="cursor-pointer"
              height={52}
              onClick={loginUsingGoogle}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-2.5 mt-7">
          <Typography className="  font-normal text-custom-md text-[#323232] font-avantGarde-md">
            Don&apos;t have an account?
          </Typography>
          <Typography className="flex justify-end text-custom-md">
            <Link
              className="!text-primary hover:!text-[#69b1ff] font-avantGarde-md"
              href={"/register"}
            >
              Sign Up
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Login;
