// course.routes.js

import { Router } from 'express';
import * as userController from '../controllers/user.controller.js'; // Import all named exports as userController
import { getStudentDashboard, getEducatorDashboard } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/students/dashboard', getStudentDashboard);
router.get('/educators/dashboard', getEducatorDashboard);

// Now use userController as an object with its named exports
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/', userController.registerUser);

export default router;
