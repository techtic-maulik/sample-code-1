import React, { useContext, useEffect, useRef, useState } from "react";
import CustomCard from "../UI/CustomCard";
import CustomIcon from "../UI/CustomIcon";
import { Avatar, List, Typography } from "antd";
import useChat from "@/utils/useChat";
import ListenContext from "../context/ListenContext";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";

const ChatsCard = ({ setUser, group }) => {
  const [groups, setGroups] = useState([]);
  const { socket } = useChat();
  const user = useSelector((state) => state.user.user);
  const { listen, sentMessage } = useContext(ListenContext);
  const router = useRouter();
  const { data } = router.query;
  useEffect(() => {
    const storedGroup = localStorage.getItem("selectedGroup");
    if (storedGroup) {
      setUser(JSON.parse(storedGroup));
    }
  }, []);

  const handleItemClick = (item) => {
    setUser(item);
    localStorage.setItem("selectedGroup", JSON.stringify(item));
    if (socket) {
      if (item?.group_name) {
        socket.emit("mark_group_messages_read", user?.id, item?.id);
      } else {
        socket.emit("mark_messages_read", item?.id, user?.id);
      }
    }
  };

  // const handleItemClick = (item) => {
  //   setUser(item);
  //   if (socket) {
  //     if (item?.group_name) {
  //       socket.emit("mark_group_messages_read", user?.id, item?.id);
  //     } else {
  //       socket.emit("mark_messages_read", item?.id, user?.id);
  //     }
  //   }
  // };
  const replaceSpecialSymbols = (text) => {
    if (!text) return "";
    return decodeURIComponent(text);
  };
  useEffect(() => {
    if (groups.length > 0) {
      groups.forEach((join) => {
        if (socket) {
          socket.emit("join", join?.id);
        }
      });
      socket?.emit("join", user?.id);
    }
  }, [groups]);

  useEffect(() => {
    // let newList = groups?.map((item) =>
    //   item?.id == group?.id
    //     ? {
    //         ...item,
    //         unread_count: 0,
    //       }
    //     : item
    // );
    // setGroups(newList);
    let newList = groups?.map((item) =>
      item?.id == listen[0]?.group_id || item?.id == listen[0]?.user_id
        ? {
            ...item,
            unread_count: item.unread_count + 1,
            last_message: listen[0],
          }
        : item
    );
    setGroups(newList);
  }, [group]);

  useEffect(() => {
    if (data) {
      const parsedObject = data && JSON.parse(data);
      setUser(parsedObject);
    }
  }, [data]);

  useEffect(() => {
    const { data } = router.query;
    const parsedObject = data && JSON.parse(data);
    if (socket) {
      socket.emit("conversation_users", user?.id, (data) => {
        setGroups(
          [parsedObject, ...data].filter((res) => typeof res === "object")
        );
      });
    }
  }, [socket]);

  useEffect(() => {
    if (sentMessage?.length > 0) {
      let newList = groups?.map((item) =>
        item?.id == group?.id ? { ...item, last_message: sentMessage[0] } : item
      );
      setGroups(newList);
    }
  }, [sentMessage]);

  // useEffect(() => {
  //   if (listen?.length > 0 && group) {
  //     if (!listen[0]?.contact_id) {
  //       if (group?.id == listen[0]?.group_id) {
  //         let newList = groups?.map((item) =>
  //           item?.id == listen[0]?.group_id
  //             ? { ...item, unread_count: 0, last_message: listen[0] }
  //             : item
  //         );
  //         setGroups(newList);
  //       } else {
  //         let newList = groups?.map((item) =>
  //           item?.id == listen[0]?.group_id
  //             ? {
  //                 ...item,
  //                 unread_count: item.unread_count + 1,
  //                 last_message: listen[0],
  //               }
  //             : item
  //         );
  //         setGroups(newList);
  //       }
  //     } else {
  //       if (group?.id == listen[0]?.user_id) {
  //         let newList = groups?.map((item) =>
  //           item?.id == listen[0]?.user_id
  //             ? { ...item, unread_count: 0, last_message: listen[0] }
  //             : item
  //         );
  //         setGroups(newList);
  //       } else {
  //         let newList = groups?.map((item) =>
  //           item?.id == listen[0]?.user_id
  //             ? {
  //                 ...item,
  //                 unread_count: item.unread_count + 1,
  //                 last_message: listen[0],
  //               }
  //             : item
  //         );
  //         setGroups(newList);
  //       }
  //     }
  //   }
  // }, [listen]);

  useEffect(() => {
    if (listen?.length > 0 && group) {
      if (!listen[0]?.contact_id) {
        if (group?.id == listen[0]?.group_id) {
          let newList = groups?.map((item) =>
            item?.id == listen[0]?.group_id
              ? { ...item, unread_count: 0, last_message: listen[0] }
              : item
          );
          setGroups(newList);
        } else {
          let newList = groups?.map((item) =>
            item?.id == listen[0]?.group_id
              ? {
                  ...item,
                  unread_count: item.unread_count + 1,
                  last_message: listen[0],
                }
              : item
          );
          setGroups(newList);
        }
      } else {
        if (group?.id == listen[0]?.user_id) {
          let newList = groups?.map((item) =>
            item?.id == listen[0]?.user_id
              ? { ...item, unread_count: 0, last_message: listen[0] }
              : item
          );
          setGroups(newList);
        } else {
          let newList = groups?.map((item) =>
            item?.id == listen[0]?.user_id
              ? {
                  ...item,
                  unread_count: item.unread_count + 1,
                  last_message: listen[0],
                }
              : item
          );
          setGroups(newList);
        }
      }
    }
  }, [listen]);

  return (
    <CustomCard>
      {/* header */}
      <div className="flex justify-between items-center py-3">
        {/* <div className="text-[29px]">Family Events</div> */}
        <Typography className="text-[24px]">Messages</Typography>
      </div>

      {/* context */}
      <div
        className=" overflow-y-auto scroll-hidden px-4 "
        style={{ height: "calc(100vh - 300px)" }}
      >
        <List
          itemLayout="horizontal"
          dataSource={groups}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => handleItemClick(item)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      item?.group_photo ||
                      item?.profile_pic ||
                      "/dummy-user.png"
                    }
                    size={50}
                  />
                }
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography className="!text-[18px] !text-[#323232] !font-normal font-avantGarde-md ">
                      {item?.group_name || item?.name}
                    </Typography>
                    <Typography className="!text-[12px] !text-[#2D2D2D] text-[400] !font-normal font-avantGarde-bk ">
                      {moment(item?.last_message?.created_at).format("hh:mm A")}
                    </Typography>
                  </div>
                }
                description={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography className="truncate !text-[18px] !text-[#7A7A7A] !font-normal font-avantGarde-bk w-[90%]">
                      {replaceSpecialSymbols(item?.last_message?.body)}
                      {console.log(
                        "item?.last_message?.body",
                        item?.last_message?.body
                      )}
                    </Typography>
                    {item?.unread_count > 0 && (
                      <CustomIcon onClick={() => {}} style="bg-[#DCDDFF]">
                        <Typography className="text-primary ">
                          {item?.unread_count}
                        </Typography>
                      </CustomIcon>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </CustomCard>
  );
};

export default ChatsCard;