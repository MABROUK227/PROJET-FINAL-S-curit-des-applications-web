import User from '../models/User.js'; // .js obligatoire

export default async function(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Accès réservé aux administrateurs' });
    }
    next();
  } catch (err) {
    res.status(500).send('Erreur Serveur');
  }
}