// const SERVER_IP = '192.168.2.41';
const SERVER_IP = '192.168.2.40';
const SERVER_PORT = '5000';
const API_BASE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/`;
const SOCKET_URL = `http://${SERVER_IP}:3000`;

const API_CONFIG = {
  baseURL: API_BASE_URL,
  socket: SOCKET_URL,
  endpoints: {
    login: 'user/login',
    info: 'user/phone',
    register: 'user/register/send-otp',
    verify: 'user/register/verifyOTP',
    update: 'user/update',
    listchats: 'user/getListChats',
    sendOTPForgotPwd: 'user/sendOTPForgotPassword',
    verifyOTPForgotPwd: 'user/verifyOTPForgotPassword',
    changePassword: 'user/changePassword',
    sendMessage: 'message/sendMessage',
    getMessagesByChatId:'message/getAllMessagesByChatId',
    // Add other endpoints here as needed
  },
};

export default API_CONFIG;
