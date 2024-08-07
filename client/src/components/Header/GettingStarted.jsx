// src/pages/GetStartedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const GettingStarted = () => {
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1620287341260-a9ecadfe7a17?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D'; // Replace with your desired image URL

  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Get Started with My Blog</h1>
        <p className="text-lg text-white mb-12">Choose an option below to begin</p>
        <div className="space-y-4">
          <Link to="/sign-up">
            <button className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
