import { Button, Typography } from "antd";
import Image from "next/image";
import React from "react";
import SidebarNavs from "./SidebarNavs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { commonAction } from "@/store/slices/commonSlice";
import { userAction } from "@/store/slices/userSlice";
import Link from "next/link";

const Sidebar = () => {
  const user = useSelector((store) => store.user.user);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full bg-white flex flex-col items-center pt-10 gap-6">
      {/* logo */}
      <div className="hidden md:block">
      <Link className="flex gap-2" href="/">
            <Image
              src="/coloredLogo.png"
              alt="loading"
              width={42.57}
              height={50}
              className="hover:cursor-pointer"
            />
      <Typography className="font-AvantGarde text-[22px] mt-4 hover:cursor-pointer">
        Family Table
      </Typography>
    </Link>
        {/* <Image
          src="/img/login/coloredlogo.png"
          alt="loading"
          width={135}
          height={40}
        /> */}
      </div>

      {/* user profile */}
      <div className="flex flex-col items-center gap-3">
        <Image
          src={user.profile_pic !== "" ? user.profile_pic : "/dummy-user.png"}
          alt="loading"
          width={110}
          height={110}
          className="rounded-full"
        />
        <Typography className="text-2xl font-avantGarde-md font-midle text-[#323232]">
          {user.name}
        </Typography>
        <Link href="/profile">
          <Button
            // onClick={() => {
            //   dispatch(commonAction.setLoading(true));
            //   dispatch(userAction.setCurrentActiveTab("Profile"));
            //   router.push("/profile");
            // }}
            className="text-[12px] font-avantGarde-md w-[100px] h-30 rounded-2xl text-primary border-primary opacity-1 hover:!bg-primary"
          >
            My Profile
          </Button>
        </Link>
      </div>
      {/* navlinks */}
      <SidebarNavs />
    </div>
  );
};

export default Sidebar;
