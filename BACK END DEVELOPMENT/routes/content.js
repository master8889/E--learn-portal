import express from 'express';
import contentController from '../controllers/content.controller.js';

const router = express.Router();

router.post('/create', contentController.createContent);

export default router;