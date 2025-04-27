import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  // Use the newUrlParser and useUnifiedTopology options are not needed
});

const userSchema = new mongoose.Schema({
  interests: [{ type: String }],
  category: { type: String },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: { type: String },
  profilePicture: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;