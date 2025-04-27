import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bio: {
    type: String
  },
  profilePicture: {
    type: String
  }
});

profileSchema.index({ user: 1 }, { unique: true });

export default mongoose.model('Profile', profileSchema);