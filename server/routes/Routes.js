import express from 'express';
import { Blog } from '../models/Model.js';
import auth from '../middleware/Auth.js';

const router = express.Router();

// Create a new blog
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newBlog = new Blog({
      title,
      content,
      authorId: req.user,  // req.user is set by the auth middleware
    });

    const savedBlog = await newBlog.save();
    console.log('Saved Blog:', savedBlog);
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error Saving Blog:', error.message);
    res.status(500).send('Server error');
  }
});

// Get all blogs for the logged-in user
router.get('/user', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.userId });
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


export default router;
