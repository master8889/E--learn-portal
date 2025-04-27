import LessonCompletion from '../models/lessonCompletion.model.js';

export async function completeLesson(req, res) {
  try {
    const lessonId = req.params.lessonId;
    const userId = req.userId;
    const lessonCompletion = new LessonCompletion({ userId, lessonId });
    await lessonCompletion.save();
    res.send({ message: 'Lesson completed successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error completing lesson' });
  }
}