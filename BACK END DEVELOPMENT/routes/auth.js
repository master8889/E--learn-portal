import express from 'express';
import User from '../models/user.model.js';
import jwt from '../utils/jwt.js';
import authenticate from '../utils/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).send({ message: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const isValid = await user.comparePassword(req.body.password);
    if (!isValid) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = jwt.generateToken(user);
    res.send({ token });
  } catch (err) {
    res.status(400).send({ message: 'Error logging in' });
  }
});

import loginRouter from './login';
router.use('/login', loginRouter);

router.get('/profile', authenticate, (req, res) => {
  // This route is protected by the authenticate middleware
  res.json({ message: 'Welcome to your profile!' });
});

router.post('/content/create', authenticate, (req, res) => {
  // This route is also protected by the authenticate middleware
  // You can access the authenticated user's ID using req.user.id
  const userId = req.user.id;
  // Create content logic here
  res.json({ message: 'Content created successfully!' });
});

export default router;