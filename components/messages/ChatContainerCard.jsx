import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Avatar, Input, List, Typography } from "antd";
import CustomCard from "../UI/CustomCard";
import { RiSendPlane2Fill } from "react-icons/ri";
import useChat from "@/utils/useChat";
import ListenContext from "../context/ListenContext";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useRouter } from "next/router";
const Text = Typography;
const ChatContainerCard = ({ group, setUser }) => {
  const [messages, setMessages] = useState([]);
  const { socket, user } = useChat();
  const { listen, setSentMessage } = useContext(ListenContext);
  const router = useRouter();
  const { User } = router.query;
  let scrollRef = useRef();

  const chatFormik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object().shape({
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const trimmedMessage = values.message.trim();
      if (!trimmedMessage) return;
      if (group?.group_name) {
        const data = {
          sender_id: user?.id,
          group_id: group?.id,
          message: trimmedMessage,
        };
        socket.emit("group_messages", data);
      } else {
        const data = {
          sender_id: user?.id,
          receiver_id: group?.member_id || group?.id,
          message: trimmedMessage,
        };
        socket.emit("message", data, (data) => {
          setMessages((priv) => [...priv, data[data.length - 1]]);
          setSentMessage([data[data.length - 1]]);
        });
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (User) {
      const parsedObject = User && JSON.parse(User);
      setUser(parsedObject);
    }
  }, [User]);

  const handleInputChange = (e) => {
    chatFormik.handleChange(e);
  };

  useEffect(() => {
    if (listen) {
      if (listen[0]?.group_id) {
        if (group?.id == listen[0]?.group_id) {
          if (messages?.findIndex((x) => x?.id == listen[0]?.id) == -1) {
            setMessages((priv) => [...priv, ...listen]);
          }
        }
      } else {
        if (group?.id == listen[0]?.user_id) {
          if (messages?.findIndex((x) => x?.id == listen[0]?.id) == -1) {
            setMessages((priv) => [...priv, ...listen]);
          }
        }
      }
    }
  }, [listen]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      if (group?.group_name) {
        socket.emit("group_conversation", group?.id, (data) => {
          socket.emit("join", group?.id);
          setMessages(data);
        });
      } else {
        socket.emit("messages", user?.id, group?.id, (data) => {
          socket.emit("join", user?.id);
          setMessages(data);
        });
      }
    }
  }, [group, socket]);

  const groupedMessages = messages.reduce((groups, message) => {
    const date = moment(message.created_at).format("D/M/YYYY");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedMessages).sort((a, b) => {
    const dateA = moment(a, "D/M/YYYY");
    const dateB = moment(b, "D/M/YYYY");
    return dateA - dateB;
  });

  const dateFinder = (dateString) => {
    const dateToCheck = moment(dateString, "M/D/YYYY");
    const today = moment();
    const yesterday = moment().subtract(1, "days");
    let result;
    if (dateToCheck.isSame(today, "day")) {
      result = "today";
    } else if (dateToCheck.isSame(yesterday, "day")) {
      result = "yesterday";
    } else {
      result = dateString;
    }

    return result;
  };
  const replaceSpecialSymbols = (text) => {
    if (!text) return "";
    return decodeURIComponent(text);
  };

  useEffect(() => {
    if (socket) {
      if (group?.group_name) {
        socket.emit("mark_group_messages_read", user?.id, group?.id);
      } else {
        socket.emit("mark_messages_read", group?.id, user?.id);
      }
    }
  }, [socket, group, messages, listen]);
  return (
    <CustomCard>
      {/* header */}
      <div>
        {!group ? (
          <div className="flex items-center pt-3 gap-3 pl-2 md:pl-0">
            <div className="w-10 h-10 relative rounded-full">
              <Image
                src={"/dummy-user.png"}
                fill
                alt="loading"
                className="rounded-full"
              />
            </div>
            <Typography className="text-[24px] text-[#323232]">
              {"Your Messages"}
            </Typography>
          </div>
        ) : (
          <div className="flex items-center pt-3 gap-3">
            <div className="w-10 h-10 relative rounded-full">
              {group && (
                <Image
                  src={
                    group?.group_photo ||
                    group?.profile_pic ||
                    "/dummy-user.png"
                  }
                  fill
                  alt="loading"
                  className="rounded-full"
                />
              )}
            </div>
            <Typography className="text-[24px] text-[#323232]">
              {group?.group_name || group?.name}
            </Typography>
          </div>
        )}
        <div className="h-[2px] w-full bg-[#CFCFCF] mt-3"></div>
      </div>

      {/* context */}
      <div
        className="flex flex-col  overflow-y-auto scroll-hidden px-4"
        style={{ height: "calc(100vh - 300px)" }}
      >
        {/* chat */}
        <div className="flex-1 my-2 overflow-y-auto scroll-hidden pr-2">
          {/* <Typography className="text-[12px] text-[#7A7A7A] text-center">
            Yesterday
          </Typography> */}

          {/* messages */}
          {sortedDates?.map((date) => (
            <div key={date}>
              <Typography className="text-[#7A7A7A] text-[14px] text-[400] flex justify-center mb-[15px] mt-[15px]">
                {dateFinder(date)}
              </Typography>
              <List
                itemLayout="horizontal"
                dataSource={groupedMessages[date]}
                locale={{
                  emptyText: (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "40%",
                      }}
                    >
                      No messages
                    </div>
                  ),
                }}
                renderItem={(item) => (
                  <>
                    {item?.user_id == user?.id ? (
                      <List.Item
                        style={{
                          borderBottom: "none",
                          display: "flex",
                          justifyContent: "end",
                          padding: "unset",
                        }}
                      >
                        <MessageItem
                          item={item}
                          user={user}
                          scrollRef={scrollRef}
                          replaceSpecialSymbols={replaceSpecialSymbols}
                        />
                      </List.Item>
                    ) : (
                      <List.Item
                        style={{
                          borderBottom: "none",
                          display: "flex",
                          justifyContent: "start",
                          padding: "unset",
                        }}
                      >
                        <MessageItem
                          item={item}
                          user={user}
                          scrollRef={scrollRef}
                          replaceSpecialSymbols={replaceSpecialSymbols}
                        />
                      </List.Item>
                    )}
                  </>
                )}
              />
            </div>
          ))}
          {!group && (
            <div className="h-full w-full flex justify-center items-center inset-0">
              <div className="flex flex-col gap-3 justify-center items-center">
                <div>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7608 1.84459C11.9492 1.16338 11.0056 0.657336 9.98903 0.358221C9.36643 0.168333 8.72352 0.0530251 8.0737 0.0147518C7.75597 -0.00491728 7.43739 -0.00491728 7.11976 0.0147518C6.70304 0.0364085 6.28801 0.0813967 5.87632 0.14982C5.00399 0.307172 4.16471 0.611403 3.39405 1.04968C2.35756 1.61152 1.48502 2.43331 0.862305 3.43444C0.459726 4.0672 0.190313 4.77548 0.0706182 5.5158C-0.0489638 6.25622 -0.0164274 7.01325 0.166347 7.74058C0.46557 8.96173 1.14206 10.0577 2.09967 10.8723C3.2979 11.9216 4.78737 12.5808 6.36973 12.7621C6.55868 12.7724 6.73497 12.8605 6.85654 13.0054C6.97822 13.1504 7.0344 13.3392 7.0117 13.5271C7.0117 13.773 6.95625 14.0175 6.92622 14.262C6.87987 14.4437 6.86962 14.6328 6.8962 14.8185C6.89871 14.8715 6.92329 14.9212 6.96399 14.9554C7.00479 14.9896 7.05794 15.0052 7.11067 14.9984C7.26499 14.9786 7.41616 14.9392 7.56066 14.8815C8.20083 14.585 8.80817 14.2219 9.37249 13.7985C10.6251 12.9131 11.808 11.9328 12.9106 10.8663C13.2944 10.5139 13.6422 10.124 13.9485 9.70247C14.6231 8.74759 14.9894 7.6093 14.9984 6.44026C14.999 5.92145 14.9279 5.40514 14.787 4.90588C14.4363 3.70419 13.7297 2.63693 12.7606 1.84455L12.7608 1.84459ZM4.45748 7.61022C4.22773 7.61179 4.00677 7.52161 3.84377 7.35965C3.68077 7.1978 3.58912 6.97756 3.58912 6.74771C3.58912 6.51796 3.68077 6.29772 3.84387 6.13587C4.00687 5.97391 4.22773 5.88383 4.45758 5.8854C4.68733 5.88697 4.90693 5.98019 5.06763 6.14434C5.22843 6.3085 5.31705 6.52997 5.3138 6.75974C5.3115 6.98562 5.22027 7.20145 5.05999 7.3606C4.89981 7.51973 4.68325 7.60939 4.45747 7.61023L4.45748 7.61022ZM7.49015 7.61022C7.26176 7.60823 7.04351 7.51575 6.88324 7.35306C6.72297 7.19037 6.63382 6.97067 6.63529 6.74237C6.63675 6.51399 6.72871 6.29541 6.89098 6.13482C7.05336 5.97412 7.27275 5.88446 7.50113 5.8854C7.72952 5.88634 7.94817 5.97778 8.1092 6.13974C8.27021 6.3017 8.3605 6.52087 8.36008 6.74927C8.35767 6.97861 8.26508 7.19768 8.10219 7.35913C7.93939 7.52056 7.71948 7.61137 7.49013 7.61169L7.49015 7.61022ZM10.5408 7.61022C10.3117 7.61137 10.0916 7.5214 9.92893 7.36007C9.76635 7.19875 9.67459 6.97935 9.67386 6.75032C9.67323 6.5212 9.76373 6.30128 9.92537 6.13902C10.0871 5.97675 10.3067 5.88552 10.5358 5.88542C10.7649 5.88521 10.9846 5.97623 11.1465 6.13829C11.3084 6.30035 11.3991 6.52016 11.3988 6.74927C11.3991 6.97734 11.309 7.19623 11.1482 7.35797C10.9873 7.51961 10.7688 7.61095 10.5408 7.61168L10.5408 7.61022Z"
                      fill="#8B17E9"
                    />
                  </svg>
                </div>
                <Text>Send Message</Text>
              </div>
            </div>
          )}
        </div>

        {/* input */}
        <div className="rounded-full bg-[#ECEDFF] p-1">
          <Input
            bordered={false}
            placeholder={"Write a message..."}
            type="text"
            name="message"
            value={chatFormik.values.message}
            className="text-custom-md h-14 hover:border-[#4096ff]"
            onChange={handleInputChange}
            onBlur={chatFormik.handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                chatFormik.submitForm();
              }
            }}
            suffix={
              <RiSendPlane2Fill
                className={`cursor-pointer ${
                  !chatFormik.values.message &&
                  "text-gray-400 pointer-events-none"
                }`}
                size={25}
                color="#797EF6"
                onClick={chatFormik.values.message && chatFormik.submitForm}
              />
            }
          />
        </div>
      </div>
    </CustomCard>
  );
};

const MessageItem = ({
  item,
  user,
  dateTimeConvert,
  scrollRef,
  replaceSpecialSymbols,
}) => (
  <div
    key={item.user_id}
    ref={scrollRef}
    className={`max-w-[286px] my-1 p-3 rounded-2xl ${
      item.user_id == user.id
        ? "bg-[#EEEEEE] float-right"
        : "bg-primary float-left"
    }`}
    style={{ clear: "both" }}
  >
    <Typography
      className={`text-[16px]  ${
        item.user_id == user.id ? "text-[#323232] right" : "text-white"
      }`}
    >
      <Typography
        className={`text-[14px]  ${
          item.user_id == user.id ? "text-[#323232] right " : "text-white"
        }`}
      >
        {item.user_id == user.id ? "" : item?.name}
      </Typography>
      {replaceSpecialSymbols(item?.body)}
    </Typography>
    <Typography
      className={`text-[12px] text-[#7A7A7A] mt-px  ${
        item.user_id == user.id ? "text-[#323232] right" : "text-white"
      }`}
    >
      {moment(item.created_at, "HH:mm").format("h:mm A")}
    </Typography>
  </div>
);

export default ChatContainerCard;
