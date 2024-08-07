// src/pages/Home.js (frontend)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const userRes = await axios.get('http://localhost:5000/api/blogs/auth/me', {
          headers: { 'x-auth-token': token },
        });
        setUser(userRes.data);

        const blogsRes = await axios.get('http://localhost:5000/api/blogs/user', {
          headers: { 'x-auth-token': token },
        });
        setBlogs(blogsRes.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/blogs',
        { ...newBlog, authorId: user._id },
        { headers: { 'x-auth-token': token } }
      );
      setBlogs([...blogs, res.data]);
      setNewBlog({ title: '', content: '' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      <h2>Create a New Blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          required
        />
        <button type="submit">Create Blog</button>
      </form>

      <h2>Your Blogs</h2>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default Home;
