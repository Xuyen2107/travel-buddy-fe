import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { selectChatState, setChats } from "../../../redux/chatSlice";
import Picker from "emoji-picker-react";

const ChatInput = () => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector(selectChatState);
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage = {
        type: "sent",
        content: message.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };

      // const updatedChats = [...selectedChat.messages, newMessage];
      // console.log("🚀 ~ file: ChatInput.jsx:23 ~ sendMessage ~ updatedChats:", updatedChats)

      dispatch(setChats(newMessage));

      setMessage("");
      setShowPicker(false);
    }
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const addEmoji = (e, emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  return (
    <div className="chatinput">
      <div className="chatinput__form">
        {showPicker && <Picker onEmojiClick={addEmoji} />}
        <SentimentVerySatisfiedIcon onClick={togglePicker} />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            placeholder="Type a message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
