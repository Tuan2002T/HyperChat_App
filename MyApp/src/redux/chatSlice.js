// chatSlice.js
import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedChat: null,
    chats: [
    ],
    chat: {},
  },
  reducers: {
    selectChat(state, action) {
      state.selectedChat = action.payload;
    },
    getListChats(state, action) {
      state.chats = action.payload;
    },
    chatGroup(state, action) {
      state.chat = action.payload;
    },
  },
});

export const {selectChat, getListChats, chatGroup} = chatSlice.actions;
export default chatSlice.reducer;
