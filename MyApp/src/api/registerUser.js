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

const regSendMail = async email => {
  try {
    const response = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.regSendMail,
      {
        email: email,
      },
    );
    return response;
  } catch (error) {
    console.log(error.response?.data.error);
    return error.response;
  }
};

const regVerifyMail = async (email, otp) => {
  try {
    const response = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.regVerifyMail,
      {
        email: email,
        otp: otp,
      },
    );
    return response;
  } catch (error) {
    console.log(error.response?.data.error);
    return error.response;
  }
};

const reg = async (user) => {
  try {
    const response = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.reg,
      {
        userName: user.id,
        fullname: user.name,
        email: user.email,
        phoneNumber: user.phone,
        birthday: formatDate(user.dob),
        password: user.pwd,
      },
    );
    return response;
  } catch (error) {
    console.log(error.response?.data.error);
    return error.response;
  }
};

const registerUser = async (pwd, name, email, phone, birthday) => {
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
    return response;
  } catch (error) {
    console.log(error.response?.data.error);
    return error.response;
  }
};

export {regSendMail, regVerifyMail, reg, registerUser};