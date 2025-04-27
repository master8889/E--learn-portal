import { Router } from 'express';
import Profile from '../models/profile.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const profile = await Profile.findOne({ user: req.user.id });
    res.send(profile);
  } catch (err) {
    res.status(400).send({ message: 'Error getting profile' });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const profile = new Profile(req.body);
    profile.user = req.user.id;
    await profile.save();
    res.status(201).send({ message: 'Profile created successfully' });
  } catch (err) {
    res.status(400).send({ message: 'Error creating profile' });
  }
});

export default router;