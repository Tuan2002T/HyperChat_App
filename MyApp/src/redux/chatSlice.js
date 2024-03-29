// chatSlice.js
import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    selectedChat: null,
    chats: [
      {id: 1, name: 'John Doe', image: require('../assets/png/avt.jpg')},
      {id: 2, name: 'Jane Doe', image: require('../assets/png/avt.jpg')},
      {id: 3, name: 'Alice', image: require('../assets/png/avt.jpg')},
      {id: 4, name: 'Bob', image: require('../assets/png/avt.jpg')},
      {id: 5, name: 'Charlie', image: require('../assets/png/avt.jpg')},
      {id: 6, name: 'David', image: require('../assets/png/avt.jpg')},
      {id: 7, name: 'Eve', image: require('../assets/png/avt.jpg')},
      {id: 8, name: 'Frank', image: require('../assets/png/avt.jpg')},
      {id: 9, name: 'Grace', image: require('../assets/png/avt.jpg')},
      {id: 10, name: 'Hank', image: require('../assets/png/avt.jpg')},
      {id: 11, name: 'Ivy', image: require('../assets/png/avt.jpg')},
      {id: 12, name: 'Jack', image: require('../assets/png/avt.jpg')},
      {id: 13, name: 'Kathy', image: require('../assets/png/avt.jpg')},
      {id: 14, name: 'Liam', image: require('../assets/png/avt.jpg')},
      {id: 15, name: 'Mia', image: require('../assets/png/avt.jpg')},
      {id: 16, name: 'Nancy', image: require('../assets/png/avt.jpg')},
      {id: 17, name: 'Oscar', image: require('../assets/png/avt.jpg')},
      {id: 18, name: 'Pam', image: require('../assets/png/avt.jpg')},
      {id: 19, name: 'Quinn', image: require('../assets/png/avt.jpg')},
      {id: 20, name: 'Rachel', image: require('../assets/png/avt.jpg')},

      // Add more chat objects as needed
    ],
  },
  reducers: {
    selectChat(state, action) {
      state.selectedChat = action.payload;
    },
  },
});

export const {selectChat} = chatSlice.actions;
export default chatSlice.reducer;
