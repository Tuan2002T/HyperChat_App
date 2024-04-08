import axios from 'axios';
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
} from '../redux/userSlice';
import API_CONFIG from './apiConfig';

const allUsers = () => async dispatch => {
  dispatch(getUsersStart());

  try {
    const response = await axios.get(
      API_CONFIG.baseURL + API_CONFIG.endpoints.allUsers,
    );
    dispatch(getUsersSuccess(response.data));
  } catch (error) {
    dispatch(getUsersFailure(error));
    console.error('Error while fetching all users', error);
  }
};

const getRequests = async userId => {
  const List = [];
  try {
    const res = await axios.get(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.getRequests}/${userId}`,
    );
    const requestData = res.data;
    const idArray = requestData.map(item => item.sender);

    for (let i = 0; i < idArray.length; i++) {
      const res = await axios.get(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.getUser}/${idArray[i]}`,
      );
      List.push(res.data);
    }
    return List;
  } catch (error) {
    console.error('Error caught:', error);
    throw error.response ? error.response.data.message : error.message;
  }
};

const getMyFriends = async (userId, token) => {
  try {
    const res = await axios.get(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.myFriends}/${userId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error caught:', error);
    throw error.response ? error.response.data.message : error.message;
  }
};

const acceptRequest = async (from, to) => {
  try {
    const res = await axios.post(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.accept}`,
      {
        sender: from,
        receiver: to,
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error caught:', error);
    throw error.response ? error.response.data.message : error.message;
  }
};

const denyRequest = async (from, to) => {
  try {
    const res = await axios.delete(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.deny}`,
      {
        data: {
          sender: from,
          receiver: to,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error caught:', error);
    throw error.response ? error.response.data.message : error.message;
  }
};

const unFriend = async (from, to) => {
  try {
    const res = await axios.delete(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.unFriend}`,
      {
        data: {
          sender: from,
          receiver: to,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error caught:', error);
    throw error.response ? error.response.data.message : error.message;
  }
};

const addFriend = async (from, to) => {
  try {
    const res = await axios.post(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.sendFriendRequest}`,
      {
        sender: from,
        receiver: to,
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error caught:', error);
    throw error.response ? error.response.data.message : error.message;
  }
};

export {
  allUsers,
  getRequests,
  getMyFriends,
  acceptRequest,
  denyRequest,
  unFriend,
  addFriend,
};
