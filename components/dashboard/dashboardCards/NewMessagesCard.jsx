import { useContext, useEffect, useState } from "react";
import CustomCard from "../../UI/CustomCard";
import CustomIcon from "../../UI/CustomIcon";
import { Avatar, List, Typography, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useChat from "@/utils/useChat";
import ListenContext from "../../context/ListenContext";
import { useRouter } from "next/router";

const NewMessagesCard = () => {
  const [list, setList] = useState();
  const { socket, user } = useChat();
  const { listen } = useContext(ListenContext);
  const router = useRouter();

  useEffect(() => {
    if (list?.length > 0) {
      list.forEach((join) => {
        if (socket) {
          socket.emit("join", join?.id);
        }
      });
      socket?.emit("join", user?.id);
    }
  }, [list]);

  useEffect(() => {
    if (socket) {
      socket.emit("conversation_users", user?.id, (data) => {
        setList(data.filter((res) => res?.unread_count > 0));
      });
    }
  }, [socket, listen]);

  const goToChat = (item) => {
    if (item) {
      if (item?.group_name) {
        socket.emit("mark_group_messages_read", user?.id, item?.id);
      } else {
        socket.emit("mark_messages_read", item?.id, user?.id);
      }
    }
    router.push({
      pathname: "/message",
      query: { User: JSON.stringify(item) },
    });
  };
  const replaceSpecialSymbols = (text) => {
    if (!text) return "";
    return decodeURIComponent(text);
  };
  return (
    <CustomCard>
      <div className="flex justify-between items-center py-3 px-3 md:px-0">
        <div className="text-[24px] font-avantGarde-md">New Messages</div>
      </div>
      <div className="h-[30vh] overflow-y-auto scroll-hidden  px-3 md:px-0">
        <List
          itemLayout="horizontal"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-[15px] text-black">No Messages</span>
                }
              />
            ),
          }}
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => goToChat(item)}
              style={{ marginRight: "10px", cursor: "pointer" }}
              extra={
                item?.unread_count > 0 && (
                  <CustomIcon onClick={() => {}} style="bg-[#DCDDFF]">
                    <Typography className="text-primary">
                      {item?.unread_count}
                    </Typography>
                  </CustomIcon>
                )
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      item?.group_photo ||
                      item?.profile_pic ||
                      `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                    }
                    size={50}
                  />
                }
                title={
                  item?.name ? (
                    <span className="!text-[18px] !text-[#323232] !font-normal font-avantGarde-md ">
                      {item?.name}
                    </span>
                  ) : (
                    <span className="!text-[18px] !text-[#323232] !font-normal font-avantGarde-md ">
                      {item?.group_name}
                    </span>
                  )
                }
                description={replaceSpecialSymbols(item?.last_message?.body)}
              />
            </List.Item>
          )}
        />
      </div>
    </CustomCard>
  );
};

export default NewMessagesCard;
