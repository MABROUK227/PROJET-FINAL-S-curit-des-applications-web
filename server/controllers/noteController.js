import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) { res.status(500).send('Erreur Serveur'); }
};

export const createNote = async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      user: req.user.id
    });
    const note = await newNote.save();
    res.json(note);
  } catch (err) { res.status(500).send('Erreur Serveur'); }
};

export const deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note non trouvée' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Non autorisé' });
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Note supprimée' });
  } catch (err) { res.status(500).send('Erreur Serveur'); }
};

export const updateNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note non trouvée' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Non autorisé' });
    
    note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(note);
  } catch (err) { res.status(500).send('Erreur Serveur'); }
};