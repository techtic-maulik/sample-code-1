import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import CustomCard from "../UI/CustomCard";
import Image from "next/image";
import CustomIcon from "../UI/CustomIcon";
import { RxCross2 } from "react-icons/rx";
import { BsCheck2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  acceptOrRejectInvitationAsync,
  getInvitationAsync,
} from "@/utils/apis/commonapi";

const MemberInvitationCard = () => {
  const [invitations, setInvitations] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getInvitationAsync().then((res) => {
      if (res.status) {
        setInvitations(res.data);
      }
    });
  }, [toggle]);

  const actionOnInvitation = (request_id, is_accept, group_id) => {
    acceptOrRejectInvitationAsync({ request_id, is_accept, group_id }).then(
      (res) => {
        if (res.status) {
          setToggle((toggle) => !toggle);
        }
      }
    );
  };
  return (
    <CustomCard>
      {/* header */}
      <div className="flex justify-between items-center py-3 px-3 md:px-0">
        <Typography className="text-[24px]">New Invitation</Typography>
      </div>

      {/* context */}
      <div
        className=" overflow-y-auto scroll-hidden px-3 md:px-0"
        style={{ height: "calc(100vh - 300px)" }}
      >
        {/* card container */}
        <div className="flex gap-5 flex-wrap">
          {invitations?.map((item) => {
            return (
              <>
                <div className="w-[230px] border-[1px] border-solid border-[#CFCFCF] rounded-[20px] p-4">
                  {/* image */}
                  <div className="w-[90px] h-[90px] relative mx-auto">
                    <Image
                      src={
                        item?.host_profile
                          ? item?.host_profile
                          : "/dummy-user.png"
                      }
                      alt="loading"
                      fill
                      className="rounded-full"
                    />
                  </div>

                  {/* content */}
                  <div className="flex flex-col items-center gap-4 mt-3">
                    <Typography className="text-[20px]">
                      {item?.group_name}
                    </Typography>
                    <div className="flex justify-center gap-5">
                      {/* reject invitation */}
                      <CustomIcon
                        style="bg-[#FFD5D5]"
                        onClick={() =>
                          actionOnInvitation(item.id, 2, item.group_id)
                        }
                      >
                        <RxCross2 size={25} color="#F10000" />
                      </CustomIcon>
                      {/* accept invitation */}
                      <CustomIcon
                        style="bg-[#797EF6]"
                        onClick={() =>
                          actionOnInvitation(item.id, 1, item.group_id)
                        }
                      >
                        <BsCheck2 size={25} color="#FFFFFF" />
                      </CustomIcon>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </CustomCard>
  );
};

export default MemberInvitationCard;
