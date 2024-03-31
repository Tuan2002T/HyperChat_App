import axios from 'axios';
import API_CONFIG from './apiConfig';

const formatDate = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
};

export const registerUser = async (pwd, name, email, phone, birthday) => {
    try {
        const response = await axios.post(
          
          API_CONFIG.baseURL + API_CONFIG.endpoints.register,
          {
            userName: new Date().getTime(),
            password: pwd,
            fullname: name,
            email: email,
            phoneNumber: phone,
            birthday: formatDate(birthday),
          },
        );
        console.log('REGISTER:', response.data.message);
        return response;
      } catch (error) {
        console.error(
          'Error in handleContinue:',
          error.response?.data || error.message,
        );
      }
};
