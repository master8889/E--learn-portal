import mongoose from 'mongoose';

const courseCertificateSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certificateUrl: {
    type: String,
    required: true
  },
  issuedAt: {
    type: Date,
    default: Date.now
  }
});

const CourseCertificate = mongoose.model('CourseCertificate', courseCertificateSchema);

export default CourseCertificate;