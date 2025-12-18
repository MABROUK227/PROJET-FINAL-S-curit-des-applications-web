import express from 'express';
import * as adminController from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.get('/users', [auth, admin], adminController.getAllUsers);
router.delete('/users/:id', [auth, admin], adminController.deleteUser);

export default router;