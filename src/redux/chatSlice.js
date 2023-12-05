import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chats: [],
    selectedChat: null,
  },

  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setChats, setSelectedChat } = chatSlice.actions;
export const selectChatState = (state) => state.chat;

export default chatSlice.reducer;