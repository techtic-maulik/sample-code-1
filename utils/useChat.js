import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import ListenContext from "../components/context/ListenContext";
const useChat = () => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user.user);
  const { setListen } = useContext(ListenContext);

  useEffect(() => {
    const socket = io(`http://joinfamilytable.com:9100`, {
      autoConnect: true,
      reconnection: false,
    });
    socket.on("connect", () => {
      setSocket(socket);
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("get_group_messege", (data) => {
        setListen(data);
        // setMessages(data);
      });
      // return () => {
      //   socket.off("get_group_messege");
      // };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on(`get_message`, (data) => {
        setListen(data);
      });
      // return () => {
      //   socket.off(`get_message`);
      // };
    }
  }, [socket]);

  return {
    user,
    socket,
  };
};

export default useChat;
