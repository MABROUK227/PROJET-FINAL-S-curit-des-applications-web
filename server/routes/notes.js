import express from 'express';
import * as noteController from '../controllers/noteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, noteController.getNotes);
router.post('/', auth, noteController.createNote);
router.delete('/:id', auth, noteController.deleteNote);
router.put('/:id', auth, noteController.updateNote);

export default router;