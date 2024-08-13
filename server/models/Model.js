import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
  },
  passwordHash: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const BlogSchema =  mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: { // New field for storing the image URL
    type: String,
    required: false, // Not required, as some blogs may not have an image
    trim: true,
  },
}, {
  timestamps: true, 
});

export const User = mongoose.model('User',UserSchema)
export const Blog = mongoose.model('Blog',BlogSchema)

