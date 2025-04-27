// enrollment.controller.js
import Enrollment from '../models/enrollment.model.js';
import Rating from '../models/rating.model.js'; // Assuming Rating model is in a separate file

// Create a new enrollment
export async function createEnrollment(req, res) {
  try {
    const { userId, courseId } = req.body;
    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();
    res.status(201).send({ message: 'Enrollment created successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating enrollment' });
  }
}

// Retrieve a list of all enrollments
export async function getEnrollments(req, res) {
  try {
    const enrollments = await Enrollment.find().exec();
    res.send(enrollments);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving enrollments' });
  }
}

// Retrieve a specific enrollment by ID
export async function getEnrollmentById(req, res) {
  try {
    const id = req.params.id;
    const enrollment = await Enrollment.findById(id).exec();
    if (!enrollment) {
      return res.status(404).send({ message: 'Enrollment not found' });
    }
    res.send(enrollment);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving enrollment' });
  }
}

// Update an enrollment
export async function updateEnrollment(req, res) {
  try {
    const id = req.params.id;
    const { userId, courseId } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(id, { userId, courseId }, { new: true }).exec();
    if (!enrollment) {
      return res.status(404).send({ message: 'Enrollment not found' });
    }
    res.send({ message: 'Enrollment updated successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error updating enrollment' });
  }
}

// Delete an enrollment
export async function deleteEnrollment(req, res) {
  try {
    const id = req.params.id;
    await Enrollment.findByIdAndRemove(id).exec();
    res.send({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting enrollment' });
  }
}

export async function completeCourse(req, res) {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;
    const enrollment = await Enrollment.findOne({ userId, courseId }).exec();
    if (!enrollment) {
      return res.status(404).send({ message: 'Enrollment not found' });
    }
    enrollment.completed = true;
    await enrollment.save();
    res.send({ message: 'Course completed successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error completing course' });
  }
}

export async function rateCourse(req, res) {
  try {
    const userId = req.userId;
    const courseId = req.params.courseId;
    const rating = req.body.rating;
    const review = req.body.review;
    const enrollment = await Enrollment.findOne({ userId, courseId }).exec();
    if (!enrollment) {
      return res.status(404).send({ message: 'Enrollment not found' });
    }
    const ratingDoc = new Rating({ rating, review, userId, courseId });
    await ratingDoc.save();
    enrollment.review = review;
    await enrollment.save();
    res.send({ message: 'Course rated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error rating course' });
  }
}