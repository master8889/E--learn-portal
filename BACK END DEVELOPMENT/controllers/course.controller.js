import Course from '../models/course.model.js';
import pdfMake from 'pdfmake';

import Stripe from 'stripe';

const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY');
const pdfDoc = new pdfMake();

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const course = new Course({ title, description, price });
    await course.save();
    res.status(201).send({ message: 'Course created successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating course' });
  }
};

// Retrieve a list of all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().exec();
    res.send(courses);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving courses' });
  }
};

// Retrieve a specific course by ID
export const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id).exec();
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }
    res.send(course);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving course' });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, price } = req.body;
    const course = await Course.findByIdAndUpdate(id, { title, description, price }, { new: true }).exec();
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }
    res.send({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error updating course' });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    await Course.findByIdAndRemove(id).exec();
    res.send({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting course' });
  }
};

// Generate certificate for a course completion
export const generateCertificate = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.userId; // Assuming userId is retrieved from authentication middleware
    const course = await Course.findById(courseId).exec();
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }
    const certificatePdf = await generateCourseCertificate(courseId, userId);
    res.send(certificatePdf); // Adjust as per your file handling or storage mechanism
  } catch (error) {
    res.status(500).send({ message: 'Error generating certificate' });
  }
};

// Helper function to generate PDF certificate
async function generateCourseCertificate(courseId, userId) {
  // Implement your PDF generation logic here
  // For example, using pdfmake or any other PDF generation library
  // Return the generated PDF buffer or file path
}

// Get ratings for a course
export const getCourseRatings = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const ratings = await Rating.find({ courseId }).populate('userId').exec();
    const averageRating = calculateAverageRating(ratings);
    res.send({ ratings, averageRating });
  } catch (error) {
    res.status(500).send({ message: 'Error getting course ratings' });
  }
};

// Helper function to calculate average rating
function calculateAverageRating(ratings) {
  if (ratings.length === 0) return 0;
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

// Get recommended courses based on user interests
export const getRecommendedCourses = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is retrieved from authentication middleware
    const user = await User.findById(userId).exec();
    const interests = user.interests; // Assuming interests are stored in user profile
    const recommendedCourses = await Course.find({ category: { $in: interests } }).exec();
    res.send(recommendedCourses);
  } catch (error) {
    res.status(500).send({ message: 'Error getting recommended courses' });
  }
};

// Purchase a course
export const purchaseCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.userId; // Assuming userId is retrieved from authentication middleware
    const course = await Course.findById(courseId).exec();
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ message: 'Error purchasing course' });
  }
};

// Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.userId; // Assuming userId is retrieved from authentication middleware
    const course = await Course.findById(courseId).exec();
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }
    // Logic to enroll the user in the course, e.g., creating a new enrollment record
    res.send({ message: 'Enrolled in course successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error enrolling in course' });
  }
};

// Update course progress for a user
export const updateCourseProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.userId; // Assuming userId is retrieved from authentication middleware
    const lessonId = req.body.lessonId;
    // Logic to update course progress based on lesson completion
    res.send({ message: 'Course progress updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating course progress' });
  }
};

export default {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  generateCertificate,
  getCourseRatings,
  getRecommendedCourses,
  purchaseCourse,
  enrollInCourse,
  updateCourseProgress,
};
