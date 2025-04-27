// enrollment.model.js
const enrollmentSchema = new mongoose.Schema({
    // ...
    completed: { type: Boolean, default: false },
    review: { type: String }
  });