import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setSelectedChat, selectChatState } from "../../../redux/chatSlice";
import "./HomeChat.css";
import Contacts from "../Contacts/Contacts.jsx";
import Main from "../Main/Main.jsx";

const HomeChat = () => {
  const dispatch = useDispatch();
  const { chats, selectedChat } = useSelector(selectChatState);

  
  useEffect(() => {
    
  }, [dispatch]);

  return (
    <div className="HomeChat">
      
      <Contacts />
      <Main />
    </div>
  );
};

export default HomeChat;
