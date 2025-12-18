import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
  category: { type: String, default: 'Personnel', enum: ['Personnel', 'Travail', 'Idée', 'Urgent'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

NoteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Note', NoteSchema);