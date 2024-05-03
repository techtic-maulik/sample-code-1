import React from "react";
import CustomIcon from "../UI/CustomIcon";
import { MdWindow } from "react-icons/md";
import { Typography } from "antd";
import { AiFillMessage, AiFillCamera } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "@/store/slices/userSlice";
import { useRouter } from "next/router";
import { commonAction } from "../../store/slices/commonSlice";
import Link from "next/link";

const ListItem = (props) => {
  // const currentTab = useSelector((store) => store.user.currentActiveTab);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleTabChange = () => {
    dispatch(userAction.setCurrentActiveTab(props.title));
    // router.push(`/${props.page}`);
  };

  return (
    <div
      className={`flex pl-5 md:pl-10 items-center transition-all ease-in-out duration-400 ${
        props.page === router.asPath.slice(1) ? "bg-[#F5F5FF]" : "bg-white"
      } gap-x-4 py-2 hover:cursor-pointer`}
    >
      <CustomIcon class="w-10 h-10" style={props.iconBgColor}>{props.children}</CustomIcon>
      <Typography
        className={`text-[18px] font-avantGarde-bk font-midle ${
          props.page === router.asPath.slice(1)
            ? "text-[#323232]"
            : "text-[#7A7A7A]"
        }`}
      >
        {props.title}
      </Typography>
    </div>
  );
};

const SidebarNavs = () => {
  return (
    <div className="w-full">
      <Link href="/dashboard">
        <ListItem page="dashboard" title="Dashboard" iconBgColor="bg-[#DCDDFF]">
          <MdWindow className="w-4 h-4" size={23} color="#797EF6" />
        </ListItem>
      </Link>
      <Link href="/photos">
        <ListItem
          page="photos"
          title="Photos & Videos"
          iconBgColor="bg-[#FFEBDC]"
        >
          <AiFillCamera className="w-4 h-4" size={23} color="#FF6D00" />
        </ListItem>
      </Link>
      <Link href="/event">
        <ListItem page="event" title="Events" iconBgColor="bg-[#FFE2EE]">
          <FaCalendarAlt className="w-4 h-4" size={23} color="#FF2782" />
        </ListItem>
      </Link>
      <Link href="/message">
        <ListItem page="message" title="Messages" iconBgColor="bg-[#F2E2FF]">
          {/* <AiFillMessage size={23} color="#8B17E9" /> */}
          <img src="/img/dashboard/message.png" alt="dashboard" />
        </ListItem>
      </Link>
      <Link href="/member">
        <ListItem
          page="member"
          title="Member Invitation"
          iconBgColor="bg-[#CAFFF6]"
        >
          <img src="/img/dashboard/member.png" alt="member" />
          {/* <BiEnvelope size={23} color="#1BBAC5" /> */}
        </ListItem>
      </Link>
    </div>
  );
};

export default SidebarNavs;
