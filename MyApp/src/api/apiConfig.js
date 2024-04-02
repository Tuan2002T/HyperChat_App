const SERVER_IP = '192.168.2.40';
const SERVER_PORT = '5000';
const API_BASE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/`;

const API_CONFIG = {
    baseURL: API_BASE_URL,
    endpoints: {
        login: 'user/login',
        info: 'user/phone',
        register: 'user/register/send-otp',
        verify: 'user/register/verifyOTP',
        listchats: 'user/getListChats',
        // Add other endpoints here as needed
    },
};

export default API_CONFIG;
