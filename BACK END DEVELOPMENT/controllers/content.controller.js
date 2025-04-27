import multer from 'multer';
import { default as Content } from '../models/content.model.js';
import User from '../models/user.model.js';

const upload = multer({ dest: './uploads/' });

const contentController = {
  createContent: async function(req, res) {
    const { title, description, content } = req.body;
    const userId = req.user.id; // Assuming you have a middleware to authenticate users

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newContent = new Content({ title, description, content, userId });
    await newContent.save();

    res.json({ message: 'Content created successfully' });
  },

  uploadContent: async function(req, res) {
    try {
      const file = req.file;
      const content = new Content({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        file: file.buffer,
        courseId: req.body.courseId,
        educatorId: req.user.id
      });
      await content.save();
      res.status(201).send({ message: 'Content uploaded successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error uploading content' });
    }
  },

  getContent: async function(req, res) {
    try {
      const contents = await Content.find({ courseId: req.params.courseId });
      res.send(contents);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error fetching content' });
    }
  }
};

export default contentController;