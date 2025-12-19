import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // CORRECTION SONARQUBE : On force la conversion en String pour éviter les injections
    const safeEmail = String(email);
    const safeUsername = String(username);

    // Vérifier si l'utilisateur existe
    let user = await User.findOne({ email: safeEmail });
    if (user) {
      return res.status(400).json({ msg: 'Cet utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    user = new User({
      username: safeUsername,
      email: safeEmail,
      password 
    });

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Créer le Token (JWT)
    const payload = { user: { id: user.id, role: user.role } };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // CORRECTION SONARQUBE : Conversion explicite en String
    const safeEmail = String(email);

    // Vérifier l'utilisateur
    let user = await User.findOne({ email: safeEmail });
    if (!user) {
      return res.status(400).json({ msg: 'Identifiants invalides' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Identifiants invalides' });
    }

    // Token
    const payload = { user: { id: user.id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};