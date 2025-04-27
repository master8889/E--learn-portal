import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js'; // Import the User model

export async function register(req, res) {
  // Register user logic
  const user = await User.create(req.body);
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
}

export async function login(req, res) {
  // Login user logic
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
}