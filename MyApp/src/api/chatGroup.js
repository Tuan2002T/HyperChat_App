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
        console.log("addddddddddddddddddd", response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response?.data.error);
        return error.response;
    }
};

export const deleteMembersChatGroup = async (members, chatGroupId, userId, token) => {

    console.log( "memberId", members);
    console.log("chatGroupId", chatGroupId);
    console.log("userId", userId);

    try {
        const response = await axios.delete(
            `${API_CONFIG.baseURL}${API_CONFIG.endpoints.deleteMembersChatGroup}/${userId}`,
             {
                data: {
                    chatGroupId,
                    members
                },
                headers: {
                    Authorization: token,
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response?.data.error);
        return error.response;

    }

}

// export const deleteChatGroup = async (chatGroupId, userId, token) => {
//     try {
//         const response = await axios.delete(
//             API_CONFIG.baseURL + API_CONFIG.endpoints.deleteChatGroup + userId,
//             {
//                 data: {
//                     chatGroupId,
//                 },
//                 headers: {
//                     Authorization: `${token}`,
//                 },
//             }
//         );
//         console.log(response.data.message);
//         return response.data;
//     } catch (error) {
//         console.error(error.response?.data.error);
//         return error.response;
//     }
// };
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
export const addAdminToChatGroup = async (chatGroupId, userId, memberId, token) => {

    console.log("chatGroupId", chatGroupId);
    console.log("userIddddddđ", userId);
    console.log("memberId", memberId);


    try {
        const response = await axios.post(
            API_CONFIG.baseURL + API_CONFIG.endpoints.addAdminToChatGroup + `/${userId}`,
            {

                memberId,
                chatGroupId,
            },
            {
                headers: {
                    Authorization: token,
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response?.data.error);
        return error.response;
    }
};

export const deleteAdminToChatGroup = async (chatGroupId, userId, memberId, token) => {
    console.log("chatGroupId", chatGroupId);
    console.log("userIddddddđ", userId);
    console.log("memberId", memberId);

    try {
        const response = await axios.delete(
            `${API_CONFIG.baseURL}${API_CONFIG.endpoints.deleteAdminToChatGroup}/${userId}`,
            {
                data: {
                    chatGroupId,
                    memberId
                },
                headers: {
                    Authorization: token,
                }
            }
        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response?.data.error);
        return error.response;
    }
};

export const outChatGroup = async (chatGroupId, userId, token) => {
    try {
        const response = await axios.delete(
            `${API_CONFIG.baseURL}${API_CONFIG.endpoints.outChatGroup}`,
            {
                data: {
                    userId,
                    chatGroupId,
                },
                headers: {
                    Authorization: token,
                }
            }
        );
        console.log("AAAAAAAAAAAAA" ,response.data);
        return response.data;
    } catch (error) {
        console.error(error.response?.data.error);
        return error.response;
    }
};

export const deleteChatGroup = async (chatGroup, userId, token) => {
    try {
        const response = await axios.delete(
            `${API_CONFIG.baseURL}${API_CONFIG.endpoints.deleteChatGroup}/${userId}`,
            {
                data: {
                    chatGroup,
                },
                headers: {
                    Authorization: token,
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response?.data.error);
        return error.response;
    }
}