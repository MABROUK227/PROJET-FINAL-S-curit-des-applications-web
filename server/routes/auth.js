import express from 'express';
import { register, login } from '../controllers/authController.js';
import { check, validationResult } from 'express-validator'; // Nouveau

const router = express.Router();

// Middleware de validation pour l'inscription
const validateRegister = [
  check('username', 'Le nom est requis').not().isEmpty(),
  check('email', 'Veuillez inclure un email valide').isEmail(),
  check('password', 'Le mot de passe doit faire 6 caractères minimum').isLength({ min: 6 })
];

// Fonction pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  next();
};

// Routes
router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', login);

export default router;