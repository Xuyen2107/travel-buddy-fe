import React from "react";
import { useSelector } from "react-redux";
import "./Main.css";
import Chat from "../Chat/Chat.jsx";

const Main = () => {
  
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  

  return !selectedChat ? (
    <div className="main">
      <h1>Welcome</h1>
      <p>Click on a contact name to start chatting!</p>
    </div>
  ) : (
    <Chat selectedChat={selectedChat} />
  );
};

export default Main;
