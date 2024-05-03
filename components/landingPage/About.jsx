import { getInTouchAsync } from "@/utils/apis/commonapi";
import { getInTouchSchema } from "@/utils/formik/schema";
import { Button, Col, Input, Row, Typography } from "antd";
import { useFormik } from "formik";
import Image from "next/image";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import toast from "../UI/toast";
import Link from "next/link";

const About = () => {
  const { contextHolder, showToast } = toast();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
    },
    validationSchema: getInTouchSchema,
    onSubmit: (values) => {
      getInTouchAsync(values).then((res) => {
        if (res.status) {
          showToast("success", res.message);
          formik.resetForm();
        } else {
          showToast("error", res.message);
          formik.resetForm();
        }
      });
    },
  });

  return (
    <div className="w-full bg-gradient-to-r from-[#797EF6] to-[#F679BA] flex justify-center items-center pt-[100px] px-[20px] md:px-[55px] pb-[60px]">
      {contextHolder}
      <Col
        className="py-[60px] px-3 md:px-[60px] bg-[#FFFFFF] rounded-[20px] w-full"
        style={{ border: "1px solid #E5F4F2" }}
      >
        <Typography
          className="text-[#323232] text-[38px] w-full font-AvantGarde mobiel-view-font"
          style={{
            lineHeight: "130%",

            letterSpacing: "-0.02em",
          }}
        >
          Let’s get in touch!
        </Typography>
        <Typography
          className="w-full text-[16px] text-[#979797] mt-2.5 font-avantGarde-bk"
          style={{
            lineHeight: "24px",

            fontWeight: 400,
          }}
        >
          Got questions about the Family Table Mobile App? Our team is here to
          help. Contact us for quick and friendly support.
        </Typography>
        {/* Email and Contact Component */}
        <Row gutter={24} className="w-full mt-7">
          {/* first section */}
          <Col sm={24} md={12} xl={12} className="flex flex-col gap-y-5">
            <Row className="flex gap-4">
              <BiPhoneCall size={24} color="#F679BA" />

              <Typography className="text-[16px] font-avantGarde-bk  text-[#323232]">
                +012 345 6789
              </Typography>
            </Row>
            <Row className="flex gap-4">
              <AiOutlineMail size={24} color="#F679BA" />
              <Typography className="text-[16px] font-avantGarde-bk text-[#323232]">
                Hello@animaapp.com
              </Typography>
            </Row>
            {/* Download App  */}
            <Row>
              <Typography
                className="font-avantGarde-md"
                style={{
                  fontWeight: 400,
                  lineHeight: "27.3px",
                  fontSize: "21px",
                }}
              >
                Download App from
              </Typography>
            </Row>
            <Row>
              <Col className="flex flex-wrap gap-[31px]">
                <div className="w-[142px] h-[185px] relative">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.app.familytable"
                    target="_blank"
                  >
                    <Image
                      src="/img/landingPage/about/google-play.png"
                      alt="play store"
                      fill
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="w-[142px] h-[185px] relative">
                  <Link
                    href="https://apps.apple.com/in/app/family-table-app/id1622331651"
                    target="_blank"
                  >
                    <Image
                      src="/img/landingPage/about/app-store.png"
                      alt="app store"
                      fill
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>

          {/* second section */}
          <Col
            sm={24}
            md={12}
            xl={12}
            className="flex flex-col gap-y-5 mt-7 md:mt-0"
          >
            <Typography className="text-[#323232] font-normal text-[21px] font-AvantGarde">
              Follow us on
            </Typography>

            {/* fba nd twitter icon */}
            <Row className="flex flex-row gap-5">
              <div className="flex justify-center items-center bg-[#E8E9FF] text-[#797EF6] p-4 rounded-full w-[50px]">
                <FaFacebookF size={18} />
              </div>
              <div className="flex justify-center items-center  bg-[#E8E9FF] text-[#797EF6] p-4 rounded-full w-[50px]">
                <BsTwitter size={18} />
              </div>
            </Row>
            <Row>
              <div className="w-full">
                <Input
                  size="large"
                  placeholder="Full Name"
                  className="separator py-3.5 px-5 rounded-[20px] flex justify-center items-center"
                  style={{ border: "1px solid #D8D8D8" }}
                  prefix={<AiOutlineUser size={20} color="#F679BA" />}
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div>
                    <Typography className="text-red-400 mt-1">
                      {formik.errors.fullName}
                    </Typography>
                  </div>
                )}
              </div>
              <div className="w-full">
                <Input
                  size="large"
                  placeholder="Email"
                  className="separator py-3.5 px-5 rounded-[20px] flex justify-center items-center mt-2.5"
                  style={{ border: "1px solid #D8D8D8" }}
                  prefix={<AiOutlineMail size={20} color="#F679BA" />}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <div>
                    <Typography className="text-red-400 mt-1">
                      {formik.errors.email}
                    </Typography>
                  </div>
                )}
              </div>
              <div>
                <Button
                  type="primary"
                  className="py-7 px-12 flex justify-center items-center mt-5 w-full md:w-fit"
                  onClick={formik.submitForm}
                >
                  <Typography className="text-[16px] text-white">
                    Submit
                  </Typography>
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default About;
