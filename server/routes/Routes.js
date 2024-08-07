import express from 'express';
import { Blog } from '../models/Model.js';
import auth from '../middleware/Auth.js';

const router = express.Router();

// Create a new blog post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ msg: 'Please include all fields' });
    }

    // Create a new blog post with the logged-in user as the author
    const newBlog = new Blog({
      title,
      content,
      authorId: req.user // Use the authenticated user ID
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('authorId', 'name email');
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('authorId', 'name email');
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a blog post by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ msg: 'Please include all fields' });
    }

    // Find the blog post
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.authorId.toString() !== req.user.toString()) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    // Update the blog post
    blog.title = title;
    blog.content = content;
    blog.updatedAt = Date.now();
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a blog post by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find the blog post
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.authorId.toString() !== req.user.toString()) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    // Delete the blog post
    await blog.remove();
    res.status(200).json({ msg: 'Blog deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
