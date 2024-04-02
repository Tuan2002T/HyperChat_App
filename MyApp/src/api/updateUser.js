import axios from 'axios';
import API_CONFIG from './apiConfig';

export const updateUser = async (userId, userData) => {
    const formData = new FormData();
    formData.append('userName', userData.userName);
    formData.append('fullname', userData.fullname);
    formData.append('birthday', userData.birthday);
    
    // Thêm dòng này để đính kèm file
    formData.append('file', {
      uri: userData.file.uri,
      type: userData.file.type,
      name: userData.file.name,
    });
  
    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.update}/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data.user;
    } catch (error) {
      console.error('Error caught:', error);
      throw error.response ? error.response.data.message : error.message;
    }
  };
  
