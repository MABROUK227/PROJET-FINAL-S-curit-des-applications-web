import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- FONCTION UTILITAIRE (Pour éviter la duplication) ---
const sendTokenResponse = (user, res) => {
  const payload = {
    user: {
      id: user.id,
      role: user.role
    }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    }
  );
};

// --- INSCRIPTION ---
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Sécurité : Conversion en String
    const safeEmail = String(email);
    const safeUsername = String(username);

    let user = await User.findOne({ email: safeEmail });
    if (user) {
      return res.status(400).json({ msg: 'Cet utilisateur existe déjà' });
    }

    user = new User({
      username: safeUsername,
      email: safeEmail,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Appel de la fonction utilitaire (Plus de duplication !)
    sendTokenResponse(user, res);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

// --- CONNEXION ---
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const safeEmail = String(email);

    let user = await User.findOne({ email: safeEmail });
    if (!user) {
      return res.status(400).json({ msg: 'Identifiants invalides' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Identifiants invalides' });
    }

    // Appel de la fonction utilitaire (Plus de duplication !)
    sendTokenResponse(user, res);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};