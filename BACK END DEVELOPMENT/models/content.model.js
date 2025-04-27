import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  file: Buffer,
  type: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  educatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Content', contentSchema);