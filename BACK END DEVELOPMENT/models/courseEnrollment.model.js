import mongoose from 'mongoose';

const courseEnrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseCertificate'
  }
});

const CourseEnrollment = mongoose.model('CourseEnrollment', courseEnrollmentSchema);

export default CourseEnrollment;