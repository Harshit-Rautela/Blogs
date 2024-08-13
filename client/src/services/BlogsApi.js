import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/blogs',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to create a blog
export const createBlog = async (blogData, token) => {
  try {

    const response = await api.post('/', blogData, { // Adjust the endpoint as needed
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error creating blog:", error.response ? error.response.data : error.message);
    throw error;
  }
};
// Function to get all blogs for the logged-in user
export const getUserBlogs = async (token) => {
  const response = await api.get('/user', {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};


// // Function to get a blog by ID
export const  getBlogById = async(id,token)=>{
  try {
    const response = await api.get(`/${id}`,{
      headers:{'x-auth-token':token},
    })
    return response.data;
  } catch (err) {
    console.error("Error getting blog:" ,err);      
  }
}

 // Function to update a blog by ID
 export const updateBlog = async(id, updatedBlog, token)=>{
  try {
    const response = await api.put(`/${id}`, updatedBlog, {
      headers:{'x-auth-token':token}
    })
    return response.data;
  } catch (err) {
    console.error("Error updating blog:" ,err);      
  }  
 }

//  Function to delete a blog by ID
export const deleteBlog = async(id, token)=>{
  try {
    await api.delete(`/${id}`,{
      headers:{'x-auth-token':token}
    })
  } catch (err) {
    console.error("Error deleting blog:", err);
  }
}

export default api;