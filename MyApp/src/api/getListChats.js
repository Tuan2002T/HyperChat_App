import axios from 'axios';
import API_CONFIG from './apiConfig';

export  const listChats = async (id) => {
  try {
    const res = await axios.get(
      API_CONFIG.baseURL + API_CONFIG.endpoints.listchats + `/${id}`,
    );
    return res.data;
  } catch (error) {
    throw new Error('Error getting user data');
  }
};
