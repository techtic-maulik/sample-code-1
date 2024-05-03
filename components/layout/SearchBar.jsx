import { Button, Input, Popover, Switch, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { TbSettings } from "react-icons/tb";
import { IoIosNotificationsOutline, IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/slices/userSlice";
import Image from "next/image";
import CustomIcon from "../UI/CustomIcon";
import { BsBellFill } from "react-icons/bs";
import { Avatar, Divider, List } from "antd";
import { RxCross2 } from "react-icons/rx";
import Notification from "../../components/assets/images/notification_bell.png";
import {
  deleteNotificationsAsync,
  getNotificationsWebDashboardAsync,
} from "../../utils/apis/commonapi";
import {
  deleteAccountAsync,
  getUserProfileByID,
  isOnNotificationAsync,
} from "../../utils/apis/auth";
import toast from "../UI/toast";
import { Tooltip } from "antd";
import CustomModal from "../UI/CustomModal";

const NotificationContainer = ({ notification, setToggle }) => {
  const router = useRouter();
  const { contextHolder, showToast } = toast();

  const deleteNotification = (notificationId) => {
    deleteNotificationsAsync(notificationId).then((res) => {
      if (res.status) {
        showToast("success", res.message);
        setToggle((toggle) => !toggle);
      }
    });
  };

  const clearAllNotification = () => {
    if (notification?.length !== 0) {
      deleteNotificationsAsync("all").then((res) => {
        if (res.status) {
          showToast("success", res.message);
          setToggle((toggle) => !toggle);
        }
      });
    }
  };

  

  return (
    <div className="w-72 md:w-96">
      {contextHolder}
      <div className="max-h-[300px] flex flex-col gap-y-2 overflow-y-auto scroll-hidden">
        <div className="flex justify-between items-center px-4">
          <Typography className="text-[20px] text-[#323232] font-semibold">
            New Messages
          </Typography>
          {notification?.length > 0 && (
            <Typography
              className="text-[14px] text-primary hover:cursor-pointer"
              onClick={() => router.push("/notifications")}
            >
              View all
            </Typography>
          )}
        </div>
        {notification && notification?.length > 0 && (
          <List
            className="flex-1 overflow-y-auto scroll-hidden px-3"
            itemLayout="horizontal"
            dataSource={notification?.slice(0, 4)}
            renderItem={(item, index) => (
         
              (
                <List.Item
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className="cursor-pointer"
                  extra={
                    <div
                      className="bg-[#CFCFCF] w-6 h-6 flex justify-center items-center rounded-full hover:cursor-pointer"
                      onClick={() => deleteNotification(item.id)}
                    >
                      <RxCross2 size={18} color="#979797" />
                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          item?.current_user?.profile_pic || "/dummy-user.png"
                        }
                        size={40}
                      />
                    }
                    title={
                      <Typography className="!text-[16px] !text-[#323232] !font-normal font-avantGarde-md ">
                        {item.title}
                      </Typography>
                    }
                    description={
                      <Typography className="!text-[12px] !text-[#7A7A7A] !font-normal font-avantGarde-bk">
                        {item.body}
                      </Typography>
                    }
                  />
                </List.Item>
              )
            )}
          />
        )}
        {notification && notification?.length == 0 && (
          <div>
            <div className="flex flex-col gap-y-2 items-center">
              <div className="relative">
                <Image src={Notification} alt="loading" />
              </div>
              <Typography className="#323232 text-[20px] font-AvantGarde">
                No Notifications
              </Typography>
              <div>
                <Typography className="text-[#7A7A7A] text-[14px] text-center font-avantGarde-bk">
                  You don’t have any new notifications yet.
                </Typography>
                <Typography className="text-[#7A7A7A] text-[14px] text-center font-avantGarde-bk">
                  You will be notified if someone messages you or invite you.
                </Typography>
              </div>
            </div>
          </div>
        )}
        {notification && notification?.length > 0 && (
          <div className="flex justify-end items-center">
            <Typography
              onClick={clearAllNotification}
              className="cursor-pointer text-[14px] text-[#7A7A7A] font-semibold"
            >
              Clear all Notifications
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export const SettingContainer = ({
  showToast,
  dispatch,
  router,
  isPopoverOpen,
  setIsPopoverOpen,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user.user);
  let notification = user?.notification;
  const [isSwitchOn, setIsSwitchOn] = useState(notification);
  const openModal = () => {
    setIsModalOpen(true);
    setIsPopoverOpen(false); // Close Popover when modal is opened
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMedia = (id) => {
    deleteAccountAsync(id).then((res) => {
      if (res.status) {
        showToast("success", res.message);
        setTimeout(() => {
          localStorage.clear();
          dispatch(userAction.setAuthenticated(false));
          closeModal();
          router.push("/login");
        }, 2000);
      } else {
        showToast("error", res.message);
      }
    });
  };

  const handleSwitchChange = (checked) => {
    setLoading(true);
    const isON = checked ? 1 : 0;
    isOnNotificationAsync(isON)
      .then((res) => {
        if (res.status) {
          getUserProfileByID(user?.id).then((res) => {
            if (res.status) {
              dispatch(userAction.setUser(res.message));
              setIsSwitchOn(res.message.notification);
            } else {
              showToast("error", res.message);
            }
          });
        } else {
          showToast("error", res.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {/* {contextHolder} */}
      <div className="w-[300px] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <Typography className="#323232 text-[16px] font-semibold">
              Notification Setting
            </Typography>
            <Typography className="#7A7A7A text-[14px]">
              Adjust your real-time notifications.
            </Typography>
          </div>
          <Switch
            loading={loading}
            defaultChecked={isSwitchOn}
            value={isSwitchOn}
            onChange={handleSwitchChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            size="large"
            type="default"
            className="w-full text-[16px] font-semibold bg-[#FF3A44] hover:!bg-[#FF3A44] !text-white hover:!text-white border !border-[#FF3A44] hover:!border-[#FF3A44]"
            onClick={openModal}
          >
            Delete Account
          </Button>
          <CustomModal
            title="Delete Account"
            isModalOpen={isModalOpen}
            handleOk={closeModal}
            handleCancel={closeModal}
          >
            <div className="flex flex-col gap-5 mt-4">
              <div>
                <Typography className="text-[#7A7A7A] text-[16px] text-center font-AvantGardeBk">
                  Are you sure you want to delete this account?
                </Typography>
              </div>
              <Button
                className="flex outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center text-[18px] rounded-lg px-[70px] py-[18px] hover:!bg-red-400 hover:!text-white hover:border-hidden leading-7 h-14 cursor-pointer transition-all ease-in-out"
                onClick={() => deleteMedia(user?.id)}
              >
                Delete Account
              </Button>
            </div>
          </CustomModal>
        </div>
      </div>
    </>
  );
};

const SearchBar = () => {
  const { contextHolder, showToast } = toast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    getNotificationsWebDashboardAsync().then((res) => {
      if (res.status) {
        setNotification(res.data);
      }
    });
  }, [toggle]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleUserLogout = () => {
    setIsModalOpen(false);
    localStorage.clear();
    dispatch(userAction.setAuthenticated(false));
    router.push("/login");
  };

  let path = router.asPath.slice(1);
  if (path === "member") {
    path = "Member Invitations";
  } else if (path?.split("?")[0] === "message") {
    path = "Messages";
  } else if (path === "event") {
    path = "Events";
  } else if (path === "photos") {
    path = "Photos and Videos";
  } else if (path === "notifications") {
    path = "Notifications";
  }

 
  return (
    <>
      {contextHolder}
      <div className="px-7 py-4 flex items-center bg-white rounded-2xl shadow-none icons-position ">
        <Typography className="flex-1 hidden md:block text-[20px] text-[#323232]  capitalize font-avantGarde-md ">
          {path === "profile" ? "My Profile" : path}
        </Typography>
        <div className="flex items-center gap-3">
          <span className="w-[2px] hidden md:block h-[40px] bg-[#CFCFCF]"></span>
          <Popover
            content={
              <SettingContainer
                showToast={showToast}
                dispatch={dispatch}
                router={router}
                isPopoverOpen={isPopoverOpen}
                setIsPopoverOpen={setIsPopoverOpen}
              />
            }
            trigger="click"
            placement="bottom"
            visible={isPopoverOpen}
            onVisibleChange={setIsPopoverOpen}
          >
            <CustomIcon class="w-10 h-10 icons-view " style="bg-[#EEEEEE]">
              <Tooltip title="">
                <TbSettings size="24" color="#979797" />
              </Tooltip>
            </CustomIcon>
          </Popover>

          <Popover
            content={
              <NotificationContainer
                notification={notification}
                toggle={toggle}
                setToggle={setToggle}
              />
            }
            trigger="click"
            placement={window.innerWidth < 475 ? "bottom" : "bottomLeft"}
          >
            {!notification?.length ? (
              <>
                <CustomIcon class="w-10 h-10 icons-view " style="bg-[#FFDBEE]">
                  <Tooltip title="">
                    <IoIosNotificationsOutline size="24" color="#F277B7" />
                  </Tooltip>
                </CustomIcon>
              </>
            ) : (
              <>
                <CustomIcon class="w-8 h-8 icons-view ">
                  <Tooltip title="">
                    <Image
                      src={Notification}
                      alt="loading"
                      className="w-8 h-8 icons-view "
                    />
                  </Tooltip>
                </CustomIcon>
              </>
            )}
          </Popover>
          <CustomIcon
            class="w-10 h-10 icons-view "
            onClick={handleLogout}
            style="bg-[#DCDDFF]"
          >
            <Tooltip title="">
              <IoMdLogOut size="24" color="#797EF6" />
            </Tooltip>
          </CustomIcon>
          <CustomModal
            title="Logout"
            isModalOpen={isModalOpen}
            handleOk={() => {
              setIsModalOpen(false);
            }}
            handleCancel={() => setIsModalOpen(false)}
          >
            <div className="flex flex-col gap-5 mt-6">
              <div>
                <Typography className="text-[#7A7A7A] text-[16px] text-center font-avantGarde-bk">
                  Are you sure you want to logout?
                </Typography>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  className="w-full font-avantGarde-md flex outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center text-[18px] rounded-lg px-[70px] py-[18px] hover:!bg-red-400 hover:!text-white hover:!border-hidden leading-7 h-14 cursor-pointer transition-all ease-in-out"
                  // onClick={() => {
                  //   handleLogout();
                  // }}
                  onClick={handleUserLogout}
                >
                  Yes
                </Button>
                <Button
                  className="w-full font-avantGarde-md flex outline-none border-px border-[#F10000] text-[#F10000] justify-center items-center text-[18px] rounded-lg px-[70px] py-[18px] hover:!bg-red-400 hover:!text-white hover:!border-hidden leading-7 h-14 cursor-pointer transition-all ease-in-out"
                  onClick={() => setIsModalOpen(false)}
                >
                  No
                </Button>
              </div>
            </div>
          </CustomModal>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
