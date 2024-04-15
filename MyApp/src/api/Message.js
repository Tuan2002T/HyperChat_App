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

    console.log('REGISTER:', response.data.toString());
    return response.data;
  } catch (error) {
    console.error(error.response?.data.error);
    return error.response;
  }
};


export const sendMessageGroup = async (sender, messageText, chatGroupId, files) => {
  try {
    const formData = new FormData();

    if (messageText !== '') {
      formData.append('messageText', messageText);
    }

    formData.append('sender', sender);
    formData.append('chatGroupId', chatGroupId);

    if (files) {
      if (Array.isArray(files)) {
        files.forEach((file) => {
          formData.append('files', file);
        });
      } else {
        formData.append('files', files);
      }
    }

    const response = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.sendMessage,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('REGISTER:', response.data.toString());
    return response.data;
  } catch (error) {
    console.error('errrrrrrr', error.response?.data.error);
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

export const retrieveMessages = async (messageId) => {
  try {
    const res = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.retrieveMessages + `/${messageId}`,
    );
    console.log('retrieveMessages:', res.data);
    return res.data;
  } catch (error) {
    throw new Error('Error getting user data');
  }
}


export const deleteMessageAPI = async (userId, messageId) => {
  console.log('userId:', userId);
  console.log('messageId:', messageId);
  try {
    const res = await axios.put(
      API_CONFIG.baseURL + API_CONFIG.endpoints.deleteMessage,
      { userId, messageId } 
    );
    console.log('deleteMessage:', res.data);
    return res.data;
  } catch (error) {
    throw new Error('Error getting user data');
  }
}

export const forwardMessageAPI = async (sender, chatPrivateId, messageId) => {
  console.log('sender:', sender);
  console.log('chatPrivateId:', chatPrivateId);
  console.log('messageId:', messageId);
  try {
    const res = await axios.post(
      API_CONFIG.baseURL + API_CONFIG.endpoints.forwardMessages,
      { sender, chatPrivateId, messageId } 
    );
    console.log('forwardMessage:', res.data);
    return res.data;
  } catch (error) {
    throw new Error('Error forwarding message');
  }
}

