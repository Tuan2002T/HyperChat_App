import axios from 'axios';
import API_CONFIG from './apiConfig';

const changePassword = async (id, old, newPassword) => {
    console.log('id: ', id);
    console.log('old: ', old);
    console.log('newPassword: ', newPassword)
    try {
      const response = await axios.put(
        API_CONFIG.baseURL + API_CONFIG.endpoints.changePassword,
        {
          userId: id,
          oldPassword: old,
          newPassword: newPassword,
        },
      );
      return response;
    } catch (error) {
        return error.response;
    }
  };

export {changePassword};