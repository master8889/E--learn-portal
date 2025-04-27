const lessonCompletionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    completedAt: { type: Date, default: Date.now }
  });