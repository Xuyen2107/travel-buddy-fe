import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChatState, setChats } from "../../../redux/chatSlice";
import ChatArea from "../ChatArea/ChatArea.jsx";
import ChatNav from "../ChatNav/ChatNav.jsx";
import "./Chat.css";

const Chat = () => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector(selectChatState);

  // No need for local state and useEffect to sync with Redux state

  return (
    <div className="chat">
      <ChatNav selectedChat={selectedChat} />
      <ChatArea />
    </div>
  );
};

export default Chat;
