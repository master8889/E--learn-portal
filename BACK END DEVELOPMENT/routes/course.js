// routes/course.js

import express from 'express';
import Course from '../models/course.model.js';
import contentController from '../controllers/content.controller.js';
import courseController from '../controllers/course.controller.js';

const router = express.Router();

router.post('/courses/:courseId/content', contentController.uploadContent);
router.get('/courses/:courseId/content', contentController.getContent);
router.get('/courses/:courseId/content', courseController.getCourses);
router.post('/courses/:courseId/enroll', courseController.enrollInCourse);

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (err) {
    res.status(400).send({ message: 'Error getting courses' });
  }
});

router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send({ message: 'Course created successfully' });
  } catch (err) {
    res.status(400).send({ message: 'Error creating course' });
  }
});

export default router;

