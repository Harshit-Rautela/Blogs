// src/components/DetailedBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/BlogsApi"; // Import the new API function

const DetailedBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if not authenticated
          navigate("/login");
          return;
        }    
        const fetchedBlog = await getBlogById(id, token);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>User is not authenticated</p>;
  
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1546177461-68622f53ed0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsb2dnaW5nfGVufDB8fDB8fHww'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 mb-4">Created at: {new Date(blog.createdAt).toLocaleDateString()}</p>
        {blog.updatedAt && <p className="text-gray-700 mb-4">Updated at: {new Date(blog.updatedAt).toLocaleDateString()}</p>}
        <div className="text-gray-800">
          {blog.content}
        </div>
      </div>
    </div>
  );
};

export default DetailedBlog;
