import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

// Create a new user
export async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
}

// Register a new user
export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).send({ message: 'Error registering user' });
  }
}

// Get all users
export async function getUsers(req, res) {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get a single user by ID
export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Update a user
export async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

// Delete a user
export async function deleteUser(req, res) {
  try {
    await User.findByIdAndRemove(req.params.id).exec();
    res.status(204).send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateUserProfile(userId, bio, profilePicture) {
  try {
    const user = await User.findByIdAndUpdate(userId, {
      bio,
      profilePicture,
    }, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
}

export { updateUserProfile };

async function getUserProfile(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    };
  } catch (error) {
    throw error;
  }
}

export { getUserProfile };