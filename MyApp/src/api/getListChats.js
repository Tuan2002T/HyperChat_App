import axios from 'axios';
import API_CONFIG from './apiConfig';

const listChats = async (id) => {
  try {
    const res = await axios.get(
      API_CONFIG.baseURL + API_CONFIG.endpoints.listchats + `/${id}`,
    );
    return res.data;
  } catch (error) {
    throw new Error('Error getting user data');
  }
};

const createNewChat = async (id, friendId) => {
  console.log('createNewChat:', id, friendId);
  try {
    const res = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.createChat,
      {
        "user1": id,
        "user2": friendId,
      }
    );
    console.log('createChat:', res.data);
    return res.data;
  }
  catch (error) {
    console.log('Error:', error);
   return error.response;
  }
}


export {listChats, createNewChat};