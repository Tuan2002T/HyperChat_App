import axios from 'axios';
import API_CONFIG from './apiConfig';
export const addMembersToChatGroup = async (members, chatGroupId, userId, token) => {

    let member = [members]
    try {
        const response = await axios.post(
            `${API_CONFIG.baseURL}${API_CONFIG.endpoints.addMembersToChatGroup}/${userId}`,
            {
                members,
                chatGroupId,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response?.data.error);
        return error.response;
    }
};

export const deleteChatGroup = async (chatGroupId, userId, token) => {
    try {
        const response = await axios.delete(
            API_CONFIG.baseURL + API_CONFIG.endpoints.deleteChatGroup + userId,
            {
                data: {
                    chatGroupId,
                },
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        console.log(response.data.message);
        return response.data;
    } catch (error) {
        console.error(error.response?.data.error);
        return error.response;
    }
};
export const findChatGroupById = async (chatGroupId) => {
    try {
        const response = await axios.get(
            API_CONFIG.baseURL + API_CONFIG.endpoints.findChatGroupById + `/${chatGroupId}`
        );
        console.log("datadddddddddddddddddddddddddddddddddd", response.data);
        return response.data;
    } catch (error) {
        console.error(error.response?.data.error);
        return error.response;
    }
}