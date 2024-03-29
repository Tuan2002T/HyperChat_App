const SERVER_IP = '192.168.2.41';
const SERVER_PORT = '5000';
const API_BASE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api/`;

const API_CONFIG = {
    baseURL: API_BASE_URL,
    endpoints: {
        login: 'user/login',
        register: 'user/register/send-otp',
        verify: 'user/register/verifyOTP',
        // Add other endpoints here as needed
    },
};

export default API_CONFIG;
