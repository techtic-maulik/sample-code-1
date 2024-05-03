import React, { useEffect, useState } from "react";
import CustomCard from "../../UI/CustomCard";
import CustomIcon from "../../UI/CustomIcon";
import { BiPlus } from "react-icons/bi";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Avatar, Divider, Empty, List, Popover, Typography } from "antd";
import {
  acceptOrRejectInvitationAsync,
  getAllGroupsAsync,
  getInvitationAsync,
} from "@/utils/apis/commonapi";

const NewInvitationCard = () => {
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
      <div className="flex justify-between items-center py-3 px-3 md:px-0">
        <div className="text-[24px] font-avantGarde-md">New Invitation</div>
      </div>
      <div className="h-[40vh] overflow-y-auto scroll-hidden px-3 md:px-0">
        <List
          itemLayout="horizontal"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-[15px] text-black">No Invitation</span>
                }
              />
            ),
          }}
          dataSource={invitations.slice(-3)}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <CustomIcon
                  key="cancel"
                  onClick={() => actionOnInvitation(item.id, 2, item.group_id)}
                  style="bg-[#FF3A44]"
                >
                  <RxCross2 size={25} color="#FFFFFF" />
                </CustomIcon>,
                <CustomIcon
                  key="ok"
                  onClick={() => actionOnInvitation(item.id, 1, item.group_id)}
                  style="bg-[#49AD09]"
                >
                  <BsCheck2 size={25} color="#FFFFFF" />
                </CustomIcon>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item?.host_profile ?? "/dummy-user.png"}
                    size={50}
                  />
                }
                title={
                  <Typography className="!text-[18px] !text-[#323232] !font-normal font-avantGarde-md ">
                    {item.group_name}
                  </Typography>
                }
                description={
                  <Typography className="!text-[16px] font-avantGarde-bk text-[#7A7A7A]">
                    {item.host_email}
                  </Typography>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </CustomCard>
  );
};

export default NewInvitationCard;
