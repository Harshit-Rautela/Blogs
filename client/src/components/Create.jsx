// src/pages/CreateBlog.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/BlogsApi";
import BackButton from "./Buttons/BackButton";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null); // New state for the file
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Create a FormData object and append all data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }    
      await createBlog(formData, token);
      navigate("/home");
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGJsYW5rfGVufDB8fHx8MTY1NzEwNzk5Mw&ixlib=rb-1.2.1&q=80&w=1080";

  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <BackButton />
      <div className="relative container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-white mb-8">
          Create a New Blog
        </h1>
        <form
          className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
