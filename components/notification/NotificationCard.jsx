import React, { useEffect, useState } from "react";
import CustomCard from "../UI/CustomCard";
import { Avatar, Empty, List, Typography } from "antd";
import {
  deleteNotificationsAsync,
  getNotificationsAsync,
  getNotificationsWebDashboardAsync,
} from "../../utils/apis/commonapi";
import toast from "../UI/toast";
import { useRouter } from "next/router";

const NotificationCard = ({ setFetchNotification }) => {
  const router = useRouter();
  const { contextHolder, showToast } = toast();
  const [notification, setNotification] = useState([]);
  const [todayNotifications, setTodayNotifications] = useState([]);
  const [yesterdayNotifications, setYesterdayNotifications] = useState([]);

  const clearAllNotification = () => {
    if (notification.length !== 0) {
      deleteNotificationsAsync("all").then((res) => {
        if (res.status) {
          showToast("success", res.message);
          setFetchNotification(true);
          getNotificationsAsync().then((res) => {
            if (res.status) {
              setNotification(res.data);
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    getNotificationsAsync().then((res) => {
      if (res.status) {
        setNotification(res.data);
        const currentDate = new Date();
        const todayDate = currentDate.toISOString().split("T")[0];
        const yesterdayDate = new Date(
          currentDate.setDate(currentDate.getDate() - 1)
        )
          .toISOString()
          .split("T")[0];
        const todayNotifications = res.data.filter((item) =>
          item.created_at.startsWith(todayDate)
        );
        const yesterdayNotifications = res.data.filter((item) =>
          item.created_at.startsWith(yesterdayDate)
        );
        setTodayNotifications(todayNotifications);
        setYesterdayNotifications(yesterdayNotifications);
      }
    });
  }, [deleteNotificationsAsync]);

  const dateTimeConvert = (timestamp, type = "time") => {
    let date = new Date(timestamp);
    if (type === "time") {
      let options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      let localTime = date.toLocaleString(undefined, options);
      return localTime;
    } else {
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, "0");
      let day = String(date.getDate()).padStart(2, "0");
      let formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
  };

  return (
    <>
      {contextHolder}
      <CustomCard>
        {/* Manage Today Notification */}
        <div className="">
          <div className="flex justify-end items-end">
            <Typography
              onClick={clearAllNotification}
              className="cursor-pointer font-AvantGarde text-[14px] text-[#7A7A7A] font-normal leading-[16.78px]"
            >
              Clear all Notifications
            </Typography>
          </div>
          <div className="flex justify-between items-center py-3">
            <Typography className="font-AvantGarde text-[24px] font-normal leading-[28.77px]">
              Today
            </Typography>
          </div>
          <List
            itemLayout="horizontal"
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="font-AvantGarde text-[15px] text-black">
                      No Notifications
                    </span>
                  }
                />
              ),
            }}
            dataSource={todayNotifications}
            renderItem={(item, index) => (
              <List.Item
                className="cursor-pointer"
                style={{ borderWidth: "2px" }}
                extra={
                  <Typography className="font-AvantGarde text-[16px] font-normal leading-[19.18px] text-[#7A7A7A] mb-[60px] md:mb-[32px]">
                    {dateTimeConvert(item.created_at)}
                  </Typography>
                }
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.current_user.profile_pic ?? "/dummy-user.png"}
                      size={50}
                    />
                  }
                  title={
                    <Typography className="font-AvantGarde text-[18px] font-normal leading-[21.58px] text-[#323232]">
                      {item.title}
                    </Typography>
                  }
                  description={
                    <Typography className="font-AvantGarde text-[16px] font-normal leading-[19.18px] text-[#7A7A7A]">
                      {item.body}
                    </Typography>
                  }
                />
              </List.Item>
            )}
          />
          {/* Manage Yesterday Notification */}
          <hr style={{ border: "1px solid rgba(5, 5, 5, 0.06)" }} />
          <div className="flex justify-between items-center py-3">
            <Typography className="font-AvantGarde text-[24px] font-normal leading-[28.77px]">
              Yesterday
            </Typography>
            {/* <Typography
              onClick={clearAllNotification}
              className="cursor-pointer text-[14px] text-[#7A7A7A] font-semibold"
            >
              Clear all Notifications
            </Typography> */}
          </div>
          <List
            itemLayout="horizontal"
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="font-AvantGarde text-[15px] text-black">
                      No Notifications
                    </span>
                  }
                />
              ),
            }}
            dataSource={yesterdayNotifications}
            renderItem={(item, index) => (
              <List.Item
                style={{ borderWidth: "2px" }}
                extra={
                  <Typography className="font-AvantGarde text-[#7A7A7A] font-normal text-base">
                    {dateTimeConvert(item.created_at)}
                  </Typography>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.current_user.profile_pic ?? "/dummy-user.png"}
                      size={50}
                    />
                  }
                  title={
                    <Typography className="font-AvantGarde !text-[18px] !text-[#323232] !font-normal ">
                      {item.title}
                    </Typography>
                  }
                  description={
                    <Typography className="font-AvantGarde text-[16px] font-normal leading-[19.18px] text-[#7A7A7A]">
                      {item.body}
                    </Typography>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </CustomCard>
    </>
  );
};

export default NotificationCard;
