import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

// Hàm chuyển đổi ảnh thành chuỗi base64
const imageToBase64 = async (path) => {
  try {
    let base64String;
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // Đọc file từ đường dẫn và chuyển đổi thành base64 sử dụng thư viện react-native-fs
      base64String = await RNFS.readFile(path, 'base64');
    } else {
      throw new Error('Unsupported platform');
    }
    return base64String;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

export default imageToBase64;