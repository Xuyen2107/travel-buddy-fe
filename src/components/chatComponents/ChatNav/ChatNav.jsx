import React from "react";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { setSelectedChat } from "../../../redux/chatSlice";
import "./ChatNav.css";

const ChatNav = ({ selectedChat }) => {
  
  const dispatch = useDispatch();

  const clearSelectedChat = () => {
    // Dispatch the action to clear the selected chat in the Redux store
    dispatch(setSelectedChat(null));
  };

  return (
    <div className="chatnav">
      <div className="chatnav__left">
        <ArrowBackIcon onClick={clearSelectedChat} />
        <Avatar src={selectedChat.photoUrl} />
        <h2> {selectedChat.name} </h2>
      </div>
      <div className="chatnav__right">
        <VideocamIcon />
        <CallIcon />
        <MoreVertIcon />
      </div>
    </div>
  );
};

export default ChatNav;
