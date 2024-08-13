// src/pages/DeleteBlog.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlog } from '../services/BlogsApi';
import BackButton from './Buttons/BackButton';

const DeleteBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async()=>{
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/login');
    }
    try{

        await deleteBlog(id,token);
        navigate('/all-blogs');
    }catch(err){
        console.error("The error is",err.message);
    }
  }
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D';

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative container mx-auto py-12 px-6 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">
          Are you sure you want to delete this blog?
        </h1>
        <BackButton />

        <div className="flex justify-center mt-8">
          <button
            onClick={handleDelete}
            className="text-white bg-red-600 hover:bg-red-700 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Delete Blog
          </button>
          <button
            onClick={() => navigate('/all-blogs')}
            className="text-white bg-gray-600 hover:bg-gray-700 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ml-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlog;