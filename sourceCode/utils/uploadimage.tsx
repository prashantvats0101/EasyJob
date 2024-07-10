import axios from 'axios';
import {IMAGE_UPLOAD} from '../Api/apiName';
const uploadImageMethod = async (imageData, setLoading) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      name: imageData.path.split('/').pop(),
      type: imageData.mime,
      uri: imageData.path,
    });

    const response = await axios.post(`${IMAGE_UPLOAD}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.filename) {
      return response.data.filename;
    } else {
      throw new Error('Image upload failed: Invalid response');
    }
  } catch (error) {
    console.error('Error uploading image:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
    }

    throw error;
  } finally {
    setLoading(false);
  }
};

export default uploadImageMethod;
