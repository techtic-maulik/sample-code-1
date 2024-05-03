import { Col, List, Row, Typography, theme } from "antd";
import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import About from "../components/landingPage/About";
import Footer from "../components/layout/Footer";
import { RxDotFilled } from "react-icons/rx";

const Privacypolicys = () => {
  const { token } = theme.useToken();
  return (
    <>
      <Col className={`flex flex-col w-full overflow-hidden bg-white`}>
        <Row gutter={24} className="mx-auto mt-[38px]">
          <Navbar logo="/img/header/darkLogo.png" darkTheme={false} />
        </Row>

        {/* Title Container */}
        <Row
          className="mt-[30px] w-full h-[221px] flex flex-row items-center pl-5 lg:pl-0 lg:justify-between relative"
          style={{ backgroundColor: token.colorPrimary, lineHeight: "65px" }}
        >
          <Typography className="text-[50px] font-AvantGarde text-white lg:ml-[165px] ml-0">
            Privacy Policy
            <Typography className="text-[#F6F6FE] text-[21px] font-AvantGarde lg:w-[620px] w-full">
              Your Privacy is Important to us. Family Table is designed to make
              it easy for families to stay connected and organized.
            </Typography>
          </Typography>
          <div
            className="w-[405px] h-[154px] bg-cover hidden md:block absolute top-8 right-2"
            style={{
              backgroundImage: `url("/img/about/heading-dots-container.png")`,
            }}
          ></div>
        </Row>

        {/* First Container in Privacy page */}
        <Col
          lg={18}
          md={24}
          sm={24}
          xs={24}
          className="mx-5 lg:mx-[165px] mt-[100px]"
        >
          <Typography className="text-[38px] text-[#323232] font-AvantGarde">
            Mobile App Fund Privacy Policy & Service Terms
          </Typography>
          <Typography className="mt-5 text-[16px] font-avantGarde-bk text-[#7A7A7A]">
            It is Mobile App Fund, LLC’s policy to respect your privacy
            regarding any information we may collect while operating our website
            or mobile applications. Accordingly, we have developed this privacy
            policy in order for you to understand how we collect, use,
            communicate, disclose and otherwise make use of personal
            information. We have outlined our privacy policy below.
          </Typography>
        </Col>

        {/* Second Container */}
        <Col
          lg={18}
          md={24}
          sm={24}
          xs={24}
          className="mx-5 lg:mx-[165px] mt-[50px] flex flex-col gap-5 text-[18px] font-AvantGarde"
          style={{ lineHeight: "160%", fontWeight: 400 }}
        >
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="font-avantGarde-bk text-[20px] text-[#323232] ">
              We will collect personal information by lawful and fair means and,
              where appropriate, with the knowledge or consent of the individual
              concerned.
            </Typography>
          </div>
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="font-avantGarde-bk text-[20px] text-[#323232]">
              Before or at the time of collecting personal information, we will
              identify the purposes for which information is being collected.
            </Typography>
          </div>
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="font-avantGarde-bk text-[20px] text-[#323232]">
              We will collect and use personal information solely for fulfilling
              those purposes specified by us and for other ancillary purposes,
              unless we obtain the consent of the individual concerned or as
              required by law.
            </Typography>
          </div>
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="font-avantGarde-bk text-[20px] text-[#323232]">
              Personal data should be relevant to the purposes for which it is
              to be used, and, to the extent necessary for those purposes,
              should be accurate, complete, and up-to-date.
            </Typography>
          </div>
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="font-avantGarde-bk text-[20px] text-[#323232]">
              We will protect personal information by using reasonable security
              safeguards against loss or theft, as well as unauthorized access,
              disclosure, copying, use or modification.
            </Typography>
          </div>
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="font-avantGarde-bk text-[20px] text-[#323232]">
              We will make readily available to customers information about our
              policies and practices relating to the management of personal
              information.
            </Typography>
          </div>
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="font-avantGarde-bk text-[20px] text-[#323232]">
              We will only retain personal information for as long as necessary
              for the fulfillment of those purposes.
            </Typography>
          </div>
        </Col>

        <Col
          lg={18}
          md={24}
          sm={24}
          xs={24}
          className="mx-5 lg:mx-[165px] mt-[50px] text-[16px] font-normal text-[#7A7A7A] font-avantGarde-bk"
          style={{ lineHeight: "24px", fontWeight: 400 }}
        >
          We are committed to conducting our business in accordance with these
          principles in order to ensure that the confidentiality of personal
          information is protected and maintained. Mobile App Fund LLC may
          change this privacy policy from time to time at Mobile App Fund LLC’s
          sole discretion.
        </Col>
        {/* Term 1 */}
        <ListTask number="1" title="Terms">
          By accessing the website or mobile applications at
          http://mobileappfund.com, you are agreeing to be bound by these terms
          of service, all applicable laws and regulations, and agree that you
          are responsible for compliance with any applicable local laws. If you
          do not agree with any of these terms, you are prohibited from using or
          accessing this site or mobile applications. The materials contained in
          this website are protected by applicable copyright and trademark law.
        </ListTask>

        {/* Term 2  */}
        <ListTask number="2" title="Use License">
          {/* 1st item */}
          <div className="">
            <div className="flex">
              <div>
                <RxDotFilled size={20} className="mt-2 mr-3" />
              </div>
              <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
                Permission is granted to temporarily download one copy of the
                materials (information or software) on Mobile App Fund LLC’s
                website for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </Typography>
            </div>

            {/* inner items */}
            <div className="ml-10">
              <div className="flex">
                <div>
                  <RxDotFilled size={20} className="mt-2 mr-3" />
                </div>
                <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
                  modify or copy the materials;
                </Typography>
              </div>

              <div className="flex">
                <div>
                  <RxDotFilled size={20} className="mt-2 mr-3" />
                </div>
                <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
                  use the materials for any commercial purpose, or for any
                  public display (commercial or non-commercial);
                </Typography>
              </div>

              <div className="flex">
                <div>
                  <RxDotFilled size={20} className="mt-2 mr-3" />
                </div>
                <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
                  attempt to decompile or reverse engineer any software
                  contained on Mobile App Fund LLC’s website;
                </Typography>
              </div>

              <div className="flex">
                <div>
                  <RxDotFilled size={20} className="mt-2 mr-3" />
                </div>
                <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
                  remove any copyright or other proprietary notations from the
                  materials; or
                </Typography>
              </div>

              <div className="flex">
                <div>
                  <RxDotFilled size={20} className="mt-2 mr-3" />
                </div>
                <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
                  or transfer the materials to another person or “mirror” the
                  materials on any other server.
                </Typography>
              </div>
            </div>
          </div>

          {/* 2nd item */}
          <div className="flex mt-5">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by Mobile App Fund LLC at
              any time. Upon terminating your viewing of these materials or upon
              the termination of this license, you must destroy any downloaded
              materials in your possession whether in electronic or printed
              format.
            </Typography>
          </div>

          {/* <List.Item>
          Use License Permission is granted to temporarily download one copy of
          the materials (information or software) on Mobile App Fund LLC’s
          website for personal, non-commercial transitory viewing only. This is
          the grant of a license, not a transfer of title, and under this
          license you may not:
        </List.Item>
        <List.Item className="ml-2">modify or copy the materials</List.Item>
        <List.Item className="ml-2">
          use the materials for any commercial purpose, or for any public
          display (commercial or non-commercial)terials in your possession
          whether in electronic or printed format.
        </List.Item>
        <List.Item className="ml-2">
          attempt to decompile or reverse engineer any software contained on
          Mobile App Fund LLC’s website
        </List.Item>
        <List.Item className="ml-2">
          remove any copyright or other proprietary notations from the materials
        </List.Item>
        <List.Item className="ml-2">
          or transfer the materials to another person or “mirror” the materials
          on any other server.
        </List.Item>
        <List.Item className="mt-2">
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Mobile App Fund LLC at any time.
          Upon terminating your viewing of these materials or upon the
          termination of this license, you must destroy any downloaded material
          in your possession whether in electronic or printed formate.
        </List.Item> */}
        </ListTask>

        {/* Term 3 */}
        <ListTask number="3" title="Disclaimer">
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
              Disclaimer The materials on Mobile App Fund, LLC’s website are
              provided on an ‘as is’ basis. Mobile App Fund LLC makes no
              warranties, expressed or implied, and hereby disclaims and negates
              all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </Typography>
          </div>
          <div className="flex">
            <div>
              <RxDotFilled size={20} className="mt-2 mr-3" />
            </div>
            <Typography className="text-[20px] text-[#7A7A7A] font-normal font-avantGarde-bk">
              Further, Mobile App Fund LLC does not warrant or make any
              representations concerning the accuracy, likely results, or
              reliability of the use of the materials on its website or
              otherwise relating to such materials or on any sites linked to
              this site.
            </Typography>
          </div>
        </ListTask>

        {/* Term 4 */}
        <ListTask number="4" title="Limitations">
          In no event shall Mobile App Fund LLC or its suppliers be liable for
          any damages (including, without limitation, damages for loss of data
          or profit, or due to business interruption) arising out of the use or
          inability to use the materials on Mobile App Fund LLC’s website, even
          if Mobile App Fund LLC or a Mobile App Fund LLC authorized
          representative has been notified orally or in writing of the
          possibility of such damage. Because some jurisdictions do not allow
          limitations on implied warranties, or limitations of liability for
          consequential or incidental damages, these limitations may not apply
          to you.
        </ListTask>

        {/* Term 5 */}
        <ListTask number="5" title="Accuracy of Materials">
          The materials appearing on Mobile App Fund LLC’s website could include
          technical, typographical, or photographic errors. Mobile App Fund LLC
          does not warrant that any of the materials on its website are
          accurate, complete or current. Mobile App Fund LLC may make changes to
          the materials contained on its website at any time without notice.
          However Mobile App Fund LLC does not make any commitment to update the
          materials.
        </ListTask>

        {/* Term 6 */}
        <ListTask number="6" title="Links">
          Mobile App Fund LLC has not reviewed all of the sites linked to its
          website and is not responsible for the contents of any such linked
          site. The inclusion of any link does not imply endorsement by Mobile
          App Fund, LLC of the site. Use of any such linked website is at the
          user’s own risk.
        </ListTask>

        {/* Term 7 */}
        <ListTask number="7" title="Modifications">
          Mobile App Fund, LLC may revise these terms of service for its website
          at any time without notice. By using this website you are agreeing to
          be bound by the then current version of these terms of service.
        </ListTask>

        {/* Term 8 */}
        <ListTask number="8" title="Governing Law">
          These terms and conditions are governed by and construed in accordance
          with the laws of New York and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </ListTask>
        <div className="mt-[100px]"></div>

        <About />
        <Footer />
      </Col>
    </>
  );
};

const ListTask = ({ number, title, children }) => {
  return (
    <Col
      lg={18}
      md={24}
      sm={24}
      xs={24}
      className="mx-5 lg:mx-[165px] mt-[50px] flex flex-col gap-6 text-[#7A7A7A]"
      style={{ lineHeight: "24px", fontWeight: 400 }}
    >
      <Row className="flex flex-row gap-1">
        <Typography className="text-[#323232] text-[20px] font-bold font-avantGarde-md ">
          {number}.
        </Typography>
        <Typography className="text-[#323232] text-[20px] font-bold font-avantGarde-md ">
          {title}
        </Typography>
      </Row>
      <Typography
        className="text-[#7A7A7A] font-normal text-[20px] font-avantGarde-bk"
        style={{ lineHeight: "32px" }}
      >
        {children}
      </Typography>
    </Col>
  );
};

export default Privacypolicys;
