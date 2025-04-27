// dashboard.controller.js

import Course from '../models/course.model.js';

export const getStudentDashboard = async (req, res) => {
  try {
    const user = req.user;
    const enrolledCourses = await Course.find({ enrollments: user.id });
    res.send(enrolledCourses);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error fetching dashboard' });
  }
};

export const getEducatorDashboard = async (req, res) => {
  try {
    const user = req.user;
    const taughtCourses = await Course.find({ educatorId: user.id });
    res.send(taughtCourses);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error fetching dashboard' });
  }
};
