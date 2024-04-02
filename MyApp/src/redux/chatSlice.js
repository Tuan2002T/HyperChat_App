// chatSlice.js
import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedChat: null,
    chats: [
    ],
  },
  reducers: {
    selectChat(state, action) {
      state.selectedChat = action.payload;
    },
    getListChats(state, action) {
      state.chats = action.payload;
    },
  },
});

export const {selectChat, getListChats} = chatSlice.actions;
export default chatSlice.reducer;
