import axios from 'axios';
import API_CONFIG from './apiConfig';

const sendOTPForgotPwd = async email => {
  try {
    const response = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.sendOTPForgotPwd,
      {
        email: email,
      },
    );
    console.log(response.data.message);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const verifyOTPForgotPwd = async (email, otp, password) => {
  try {
    const response = await axios.put(
      API_CONFIG.baseURL + API_CONFIG.endpoints.verifyOTPForgotPwd,
      {
        email: email,
        userOTP: otp,
        password: password,
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {sendOTPForgotPwd, verifyOTPForgotPwd};
