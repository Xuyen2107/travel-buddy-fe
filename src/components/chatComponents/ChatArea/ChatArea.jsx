import React from "react";
import { useSelector } from "react-redux";
import ChatInput from "../ChatInput/ChatInput.jsx";
import ReceiverMessage from "../ReceiverMessage/ReceiverMessage.jsx";
import SenderMessage from "../SenderMessage/SenderMessage.jsx";
import { selectChatState } from "../../../redux/chatSlice";
import "./ChatArea.css";

const ChatArea = () => {
  const { selectedChat } = useSelector(selectChatState);

  return (
    <div className="chatarea">
      <div className="chatarea__container"></div>
      <div className="chatarea__messages">
        {selectedChat.messages.map((message, index) => {
          return message.type === "sent" ? (
            <SenderMessage key={index} message={message} />
          ) : (
            <ReceiverMessage key={index} message={message} />
          );
        })}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatArea;
