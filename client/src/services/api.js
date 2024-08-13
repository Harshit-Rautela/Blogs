import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: 'https://blogging-ten-nu.vercel.app/api/blogs', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle user signup
export const signupUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; // Returns the response data, which might include a token
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component
  }
};

export const loginUser = async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      return response.data; // Returns the response data, which might include a token
    } catch (error) {
      throw error; // Rethrow the error to handle it in the component
    }
  };

  export default api;