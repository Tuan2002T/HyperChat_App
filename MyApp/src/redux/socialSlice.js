import {createSlice} from '@reduxjs/toolkit';
const socialSlice = createSlice({
  name: 'social',
  initialState: {
    me: {},
    users: [],
    friends: [],
    friendRequests: [],
    friendSuggestions: [],
  },
  reducers: {
    setMe(state, action) {
      state.me = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setFriends(state, action) {
      state.friends = action.payload;
    },
    setFriendRequests(state, action) {
      state.friendRequests = action.payload;
    },
    clearFriendRequests(state) {
      state.friendRequests = [];
    },
    setFriendSuggestions(state, action) {
      state.friendSuggestions = action.payload;
    },
  },
});

export const {
  setMe,
  setUsers,
  setFriends,
  setFriendRequests,
  clearFriendRequests,
  setFriendSuggestions,
} = socialSlice.actions;
export default socialSlice.reducer;
