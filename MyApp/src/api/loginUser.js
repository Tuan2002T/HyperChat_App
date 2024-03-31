import axios from 'axios';
import API_CONFIG from './apiConfig';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.login,
      {
        account: username,
        password: password,
      },
    );
    return getData(response.data.phoneNumber);
  } catch (error) {
    throw new Error('The account or password is incorrect');
  }
};

const getData = async phone => {
  try {
    const res = await axios.get(
      API_CONFIG.baseURL + API_CONFIG.endpoints.info + `/${phone}`,
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error('Error getting user data');
  }
};
