// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/blogs',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to create a blog
export const createBlog = async (blogData, token) => {
  console.log("HI")
  try {
    const response = await api.post('/', blogData, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.log("abc", error)
  }
};

// Function to get all blogs for the logged-in user
export const getUserBlogs = async (token) => {
  const response = await api.get('/user', {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export default api;
