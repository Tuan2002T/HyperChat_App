// userSlice.js

import {createSlice} from '@reduxjs/toolkit';
import {allUsers} from '../api/allUser';

const initialState = {
  me: null,
  friends: [],
  requests: [],
  allUsers: [],
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMe(state, action) {
      state.me = action.payload;
    },
    setFriends(state, action) {
      state.friends = action.payload;
    },
    setRequests(state, action) {
      state.requests = action.payload;
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    getUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  setMe,
  setFriends,
  setRequests,
  setAllUsers,
  setUsers,
} = userSlice.actions;

export default userSlice.reducer;
