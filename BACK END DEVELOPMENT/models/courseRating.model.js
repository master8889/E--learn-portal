import mongoose from 'mongoose';

const courseRatingSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
});

const CourseRating = mongoose.model('CourseRating', courseRatingSchema);

export default CourseRating;