import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  rating: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }] // new field to store lesson IDs
});

courseSchema.index({ title: 1 }, { unique: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;