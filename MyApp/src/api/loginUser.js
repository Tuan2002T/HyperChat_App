import axios from 'axios';
import API_CONFIG from './apiConfig';

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.login,
      {
        account: username,
        password: password,
      },
    );
    return getData(response.data.phoneNumber, response.data.token);
  } catch (error) {
    throw new Error('The account or password is incorrect');
  }
};

const getData = async (phone, token) => {
  try {
    const res = await axios.get(
      API_CONFIG.baseURL + API_CONFIG.endpoints.info + `/${phone}`,
    );
    res.data.token = token;
    return res.data;
  } catch (error) {
    throw new Error('Error getting user data');
  }
};

export {loginUser, getData};