import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/Model.js';
const router = express.Router();

// Register a new user
router.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      passwordHash,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    // The server sends the generated JWT token back to the client in the response
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
  
  // Login a user
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate a JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

  export default router;