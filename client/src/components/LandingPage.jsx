// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1665686304129-a6e2d16923e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to My Blog</h1>
        <p className="text-lg text-white mb-8">Discover amazing content and insights</p>
        <Link to="/get-started">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
