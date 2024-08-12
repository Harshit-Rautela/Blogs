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

//Get a blog by ID
router.get('/:id',auth, async(req,res)=>{
  const {id} = req.params;
  try{
    const blog = await Blog.findById(id);
    if(!blog){
      return res.status(404).json({msg:'Blog not found'});
    }
    if(blog.authorId.toString() !== req.user){
      return res.status(401).json({msg:` Blog is not if User, req.user =${ req.user}, authorId=${blog.authorId}`})
    }
    res.json(blog);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');

  }

})

//Update a blog by ID;
router.put('/:id',auth , async(req,res)=>{
  const {id} = req.params;
  const {title,content} = req.body;
  try {
    const blog = await Blog.findById(id);
    if(!blog){
      return res.status(404).json({msg:'Blog not found'});
    }
    if(blog.authorId.toString() !== req.user){
      return res.status(401).json({msg:` Blog is not if User, req.user =${ req.user}, authorId=${blog.authorId}`})
    }
    blog.title = title||'Afdbg';
    blog.content = content||'sdgfgfdbtgh';
    blog.updatedAt = Date.now();
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Cannot update blog.'})    
  }
})


 // Delete a blog by ID
router.delete('/:id',auth, async(req,res)=>{
  const {id} = req.params;
  try {
    const blog = await Blog.findById(id);
    if(!blog){
      res.status(404).json({msg:'Blog not found'});
    }
    if(blog.authorId.toString()!==req.user){
      res.status(401).json({msg:'User is not authorized to delete the blog.'})
    }
    await Blog.findByIdAndDelete(id); // Use findByIdAndDelete to remove the blog
    res.json({ msg: 'Blog deleted' });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Cannot delete blog.'})
    
  }
})



export default router;
