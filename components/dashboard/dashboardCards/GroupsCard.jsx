import CustomCard from "../../UI/CustomCard";
import CustomIcon from "../../UI/CustomIcon";
import { BiDotsVerticalRounded, BiPlus } from "react-icons/bi";
import {
  Avatar,
  Divider,
  Input,
  List,
  Popover,
  Typography,
  Select,
  Empty,
} from "antd";
import CreateGroupModal from "../../UI/modals/CreateGroupModal";
import { useEffect, useState } from "react";
import AddNewMemberModal from "@/components/UI/modals/AddNewMemberModal";
import GroupDetailsModal from "@/components/UI/modals/GroupDetailsModal";
import DeleteGroupModal from "../../UI/modals/DeleteGroupModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGroupsAsync,
  getGroupMembersAsync,
} from "../../../utils/apis/commonapi";
import toast from "../../UI/toast";
import useChat from "@/utils/useChat";

const GroupsCard = () => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberGroupModalOpen] = useState(false);
  const [isGroupDetailsModalOpen, setIsGroupDetailsModalOpen] = useState(false);
  const [isGroupDeleteModalOpen, setIsGroupDeleteModalOpen] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [groupTitle, setGroupTitle] = useState("");

  const groups = useSelector((store) => store.user.groups);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const { contextHolder, showToast } = toast();
  useEffect(() => {
    dispatch(getAllGroupsAsync());
  }, [
    isGroupModalOpen,
    isGroupDeleteModalOpen,
    isGroupDetailsModalOpen,
    isGroupDeleteModalOpen,
    dispatch,
  ]);

  return (
    <>
      {contextHolder}
      {/* modals here */}
      <CreateGroupModal
        isModalOpen={isGroupModalOpen}
        setIsModalOpen={setIsGroupModalOpen}
        showToast={showToast}
      />
      <AddNewMemberModal
        isModalOpen={isAddMemberModalOpen}
        setIsModalOpen={setIsAddMemberGroupModalOpen}
        groupId={groupId}
        showToast={showToast}
      />
      <GroupDetailsModal
        isModalOpen={isGroupDetailsModalOpen}
        setIsModalOpen={setIsGroupDetailsModalOpen}
        groupId={groupId}
        showToast={showToast}
      />
      <DeleteGroupModal
        isModalOpen={isGroupDeleteModalOpen}
        setIsModalOpen={setIsGroupDeleteModalOpen}
        groupId={groupId}
        showToast={showToast}
        groupTitle={groupTitle}
      />

      {/* after modal */}
      <CustomCard>
        <div className="flex justify-between items-center pb-3 px-3 md:px-0">
          <div className="text-[24px] font-avantGarde-md">Groups</div>
          <CustomIcon
            class="w-10 h-10"
            onClick={() => setIsGroupModalOpen(true)}
            style="bg-[#797EF6]"
          >
            <BiPlus size="30" color="#FFFFFF" />
          </CustomIcon>
        </div>

        {/* list of groups */}
        <div className="h-[40vh] overflow-y-auto scroll-hidden px-3 md:px-0">
          <List
            itemLayout="horizontal"
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-[15px] text-black">
                      No Groups available
                    </span>
                  }
                />
              ),
            }}
            dataSource={groups}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.group_photo ?? "/dummy-user.png"}
                      size={50}
                    />
                  }
                  title={
                    <Typography className="!text-[18px] !text-[#323232] !font-normal font-avantGarde-md ">
                      {item.group_name}
                    </Typography>
                  }
                  description={
                    <Typography className="!text-[16px] font-avantGarde-bk text-[#7A7A7A]">{`${item.members_count} Members`}</Typography>
                  }
                />
                <Select
                  bordered={false}
                  dropdownMatchSelectWidth={false}
                  showArrow={true}
                  onChange={() => {}}
                  value={null}
                  disabled={
                    isGroupModalOpen ||
                    isAddMemberModalOpen ||
                    isGroupDeleteModalOpen ||
                    isGroupDetailsModalOpen ||
                    isGroupDeleteModalOpen
                  }
                  suffixIcon={
                    <CustomIcon onClick={() => {}} style="bg-[#EEEEEE]">
                      <BiDotsVerticalRounded size={25} />
                    </CustomIcon>
                  }
                  placement="bottomRight"
                  dropdownRender={() => (
                    <div className="w-[232px] px-5 py-3 flex flex-col items-start">
                      {user?.id === item?.user_id && (
                        <>
                          <Typography
                            className="text-base text-[#323232] hover:cursor-pointer"
                            onClick={() => {
                              setGroupId(item.id);
                              setIsAddMemberGroupModalOpen(true);
                            }}
                          >
                            Add new member
                          </Typography>
                          <Divider className="my-2" />
                        </>
                      )}

                      <Typography
                        className="text-base text-[#323232] hover:cursor-pointer"
                        onClick={() => {
                          setGroupId(item.id);
                          setIsGroupDetailsModalOpen(true);
                          // getGroupMembersAsync(groupId).then((res) => {
                          //   if (res.status) {
                          //     setGroupMembers(res.data.members);
                          //     setGroupProfilePic(res.data.group_photo);
                          //   }
                          // });
                        }}
                      >
                        View group details
                      </Typography>
                      {user.id === item.user_id ? (
                        <>
                          <Divider className="my-2" />
                          <Typography
                            onClick={() => {
                              setGroupId(item.id);
                              setIsGroupDeleteModalOpen(true);
                              setGroupTitle("delete");
                            }}
                            className="text-base text-[#F10000] hover:cursor-pointer"
                          >
                            Delete group
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Divider className="my-2" />
                          <Typography
                            onClick={() => {
                              setGroupId(item.id);
                              setIsGroupDeleteModalOpen(true);
                              setGroupTitle("leave");
                            }}
                            className="text-base text-[#F10000] hover:cursor-pointer"
                          >
                            Leave group
                          </Typography>
                        </>
                      )}
                    </div>
                  )}
                />
              </List.Item>
            )}
          />
        </div>
      </CustomCard>
    </>
  );
};

export default GroupsCard;
