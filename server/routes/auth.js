import express from 'express';
import * as authController from '../controllers/authController.js'; // Notez l'import * as
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);

export default router;