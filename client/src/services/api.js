import axios from 'axios';


// Function to handle user signup
 const signupUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Returns the response data, which might include a token
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component
  }
};

 const loginUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Returns the response data, which might include a token
    } catch (error) {
      throw error; // Rethrow the error to handle it in the component
    }
  };

  export { signupUser, loginUser };