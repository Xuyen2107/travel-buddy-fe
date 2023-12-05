import React from "react";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { setSelectedChat } from "../../../redux/chatSlice";
import "./ContactCard.css";

const ContactCard = ({ contact }) => {
  const dispatch = useDispatch();

  const openChat = () => {
    // Dispatch the action to set the selected chat in the Redux store
    dispatch(setSelectedChat(contact));
  };

  return (
    <div className="contactcard" onClick={openChat}>
      <Avatar alt={contact?.name} src={contact?.photoUrl} />
      <div className="contactcard__username">
        <h3> {contact?.name} </h3>
      </div>
    </div>
  );
};

export default ContactCard;
