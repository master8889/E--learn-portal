import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import profileRoutes from './routes/profile.js';
import courseRoutes from './routes/course.js';
import contentRoutes from './routes/content.js';
import userRoutes from './routes/user.routes.js';
import User from './models/user.model.js';
import Content from './models/content.model.js'; // Import Content model
import authenticate from './utils/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
console.log('MongoDB URI:', MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Terminate the script with an error code
});

app.use(cors());
app.use(express.json());

// Authentication middleware should come before other routes
app.use('/api/auth', async (req, res, next) => {
  try {
    await authenticate(req, res, next);
  } catch (err) {
    next(err);
  }
});

app.use('/api/profile', profileRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/user', userRoutes); // Update path to '/api/user'
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Handle user creation separately or through user routes
app.post('/api/user', async (req, res) => { // Ensure only one endpoint for creating user
  const userData = req.body;
  console.log('UserData:', userData);
  const user = new User(userData);
  try {
    await user.save();
    res.send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// Handle content creation separately
app.post('/api/content', async (req, res) => {
  const contentData = req.body;
  console.log('ContentData:', contentData);

  let userId = contentData.userId;
  delete contentData.userId; // Remove userId from contentData

  const content = new Content(contentData);

  if (userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      content.userId = user._id;
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error finding user');
    }
  }

  try {
    await content.save();
    res.send('Content created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating content');
  }
});
