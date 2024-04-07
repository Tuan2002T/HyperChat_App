import axios from 'axios';
import API_CONFIG from './apiConfig';

export const sendMessage = async (sender, messageText, chatPrivateId, files) => {
    try {
      const formData = new FormData();
      if (messageText !== '') {
        
        formData.append('messageText', messageText);
      }
      formData.append('sender', sender);
      formData.append('chatPrivateId', chatPrivateId);
  
     formData.append('files', files);
  
      const response = await axios.post(
        API_CONFIG.baseURL + API_CONFIG.endpoints.sendMessage,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('REGISTER:',  response.data.toString());
      return response.data.toString();
    } catch (error) {
      console.error(error.response?.data.error);
      return error.response;
    }
  };

export const getMessagesByChatId = async (roomId) => {
  try {
    const res = await axios.get(
      API_CONFIG.baseURL + API_CONFIG.endpoints.getMessagesByChatId + `/${roomId}`,
    );
    return res.data;
  } catch (error) {
    throw new Error('Error getting user data');
  }
  };