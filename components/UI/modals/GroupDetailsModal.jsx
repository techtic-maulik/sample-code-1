import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomModal from "../CustomModal";
import Image from "next/image";
import { Avatar, Button, List, Popconfirm, Typography, message } from "antd";
import { BiPencil } from "react-icons/bi";
import AddNewMemberModal from "./AddNewMemberModal";
import { useSelector } from "react-redux";
import { getGroupMembersAsync, updateGroupAsync } from "@/utils/apis/commonapi";
import DeleteGroupModal from "../modals/DeleteGroupModal";
import DeleteGroupMemberModal from "../modals/DeleteGroupMemberModal";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";

function UpdateProfilePic({
  children,
  groupId,
  setProfilePicUpdatedToggle,
  setGroupProfilePic,
  profilePicUpdatedToggle,
  showToast,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.type.split("/")[0] !== "image") {
        showToast("error", "Invalid file type. Please select an image");
        return;
      } else if (file.size > 5 * 1024 * 1024) {
        showToast(
          "error",
          "Profile pictures and photos should be less than 5 MB"
        );
        return;
      } else {
        const reader = new FileReader();
        reader.onabort = () => console.log("failed to open file");
        reader.onerror = () => console.log("failed to open file");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          updateGroupAsync({
            group_photo: file,
            groupId: groupId,
          }).then((res) => {
            setGroupProfilePic(res.response);
            res.status
              ? showToast("success", res.message)
              : showToast("error", res.message);
          });
          setProfilePicUpdatedToggle(
            (profilePicUpdatedToggle) => !profilePicUpdatedToggle
          );
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </div>
    </>
  );
}

const GroupDetailsModal = ({
  setIsModalOpen,
  isModalOpen,
  groupId,
  showToast,
}) => {
  const [isAddMemberModalOpen, setIsAddMemberGroupModalOpen] = useState(false);
  const [isGroupDeleteModalOpen, setIsGroupDeleteModalOpen] = useState(false);
  const [groupProfilePic, setGroupProfilePic] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [profilePicUpdatedToggle, setProfilePicUpdatedToggle] = useState(false);
  const [isDeleteGroupMemberModalOpen, setIsDeleteGroupMemberModalOpen] =
    useState(false);
  const [memberId, setMemberId] = useState(null);
  const imageRef = useRef(null);
  const user = useSelector((store) => store.user.user);
  const router = useRouter();

  useEffect(() => {
    getGroupMembersAsync(groupId).then((res) => {
      if (res.status) {
        let userPossition = res.data.members.findIndex(
          (User) => User.member_id == user.id
        );
        if (userPossition > 0) {
          let currUser = res.data.members.splice(userPossition, 1);
          res.data.members.unshift(currUser[0]);
        }
        setGroupMembers(res.data.members);
        setGroupProfilePic(res.data.group_photo);
      }
    });
  }, [profilePicUpdatedToggle, groupId, isDeleteGroupMemberModalOpen]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm = (e) => {
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Group Detail"
    >
      <AddNewMemberModal
        isModalOpen={isAddMemberModalOpen}
        setIsModalOpen={setIsAddMemberGroupModalOpen}
        groupId={groupId}
        showToast={showToast}
      />
      <DeleteGroupModal
        isModalOpen={isGroupDeleteModalOpen}
        setIsModalOpen={setIsGroupDeleteModalOpen}
        groupId={groupId}
        showToast={showToast}
        closeParent={handleOk}
      />
      <DeleteGroupMemberModal
        isModalOpen={isDeleteGroupMemberModalOpen}
        setIsModalOpen={setIsDeleteGroupMemberModalOpen}
        memberId={memberId}
        showToast={showToast}
        //closeParent={handleOk}
      />
      <div className="flex flex-col gap-3 mt-6">
        <div className="rounded-full w-[110px] h-[110px] m-auto relative">
          <Image
            src={groupProfilePic ? groupProfilePic : "/dummy-user.png"}
            fill
            alt="loading"
            className="rounded-full"
          />
          {groupMembers?.some((item) => item?.user_id === user?.id) && (
            <UpdateProfilePic
              groupId={groupId}
              setGroupProfilePic={setGroupProfilePic}
              setProfilePicUpdatedToggle={setProfilePicUpdatedToggle}
              profilePicUpdatedToggle={profilePicUpdatedToggle}
              showToast={showToast}
            >
              <div
                className="absolute right-2 bottom-2 w-[20px] h-[20px] hover:cursor-pointer flex justify-center items-center rounded-full bg-[#797EF6] border-px border-white border-solid"
                onClick={() => {}}
              >
                <BiPencil size="12" color="#FFF" />
              </div>
            </UpdateProfilePic>
          )}
        </div>

        <Typography className="text-[20px] text-[#323232] font-AvantGarde">
          Group Members
        </Typography>
        <List
          itemLayout="horizontal"
          dataSource={groupMembers}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item?.profile_pic || "/dummy-user.png"}
                    size={30}
                  />
                }
                description={
                  <div className="flex flex-col">
                    <p className="font-avantGarde-bk text-[16px] text-[#323232]">
                      {item?.name}
                    </p>
                    <p className="font-avantGarde-bk text-[12px] text-[#323232]">
                      {(item && item?.relation?.name) ?? "-"}
                    </p>
                  </div>
                }
              />
              {user.id != item?.member_id && (
                <>
                  <Typography
                    onClick={() => {
                      router.push({
                        pathname: "/message",
                        query: {
                          data: JSON.stringify({
                            name: item.name,
                            member_id: item.member_id,
                          }),
                        },
                      });
                    }}
                    className="font-avantGarde-bk pr-[20px] text-[#818cf8] text-[14px] hover:cursor-pointer"
                  >
                    Message
                  </Typography>
                  {user?.id === item?.user_id && (
                    <Typography
                      onClick={() => {
                        setMemberId(item.id);
                        setIsDeleteGroupMemberModalOpen(true);
                      }}
                      className="font-avantGarde-bk text-red-400 text-[14px] hover:cursor-pointer"
                    >
                      Delete member
                    </Typography>
                  )}
                </>
              )}
            </List.Item>
          )}
        />
        {groupMembers?.some((item) => item?.user_id === user?.id) && (
          <div className="flex justify-center gap-2 mobile-buttons">
            <Button
              className="w-[250px] font-avantGarde-md flex outline-none border-0 mobile-buttons-responsive justify-center items-center text-[18px] bg-primary text-white rounded-lg py-[18px] px-[50px]  leading-7 h-14 cursor-pointer hover:!text-white hover:!bg-[#818cf8] transition-all ease-in-out"
              onClick={() => {
                setIsAddMemberGroupModalOpen(true);
              }}
            >
              Add New Member
            </Button>
            {/* <Button
            className="w-[250px] font-avantGarde-md flex  mobile-buttons-responsive outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center text-[18px] rounded-lg px-[50px] py-[18px] hover:!bg-red-400 hover:!text-white leading-7 h-14 cursor-pointer transition-all ease-in-out"
            onClick={() => setIsGroupDeleteModalOpen(true)}
          >
            Delete Group
          </Button> */}
          </div>
        )}
      </div>
    </CustomModal>
  );
};
export default GroupDetailsModal;
