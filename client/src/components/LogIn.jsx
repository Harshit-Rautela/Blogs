import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Import the login function

const LogIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  //const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login API function
      const data = await loginUser({ email, password});
      // Store the token or handle login success
      localStorage.setItem('token', data.token);
      console.log('Login successful:', data);
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
    }
  };

  return (

    <div className="w-full max-w-md mx-auto my-12 p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Log In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor='name'>Enter your name</label>
        <input type='text' id='name' value={name} onChange={(e)=>setName(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required/>
        <label htmlFor='email'>Enter your Email</label>
        <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required/>
        <label htmlFor='password'>Enter your Password</label>
        <input type='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required/>
        
        <div className='flex justify-center'>
        <button type='submit'  className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Log In</button>
        </div>
        
      </form>
    </div>
  )
}

export default LogIn