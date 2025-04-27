import { Router } from 'express';
import User from '../models/user.model.js';
import jwt from '../utils/jwt.js';

const router = Router();

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

export default router;