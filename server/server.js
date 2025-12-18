import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';

// Import des routes (Notez le .js OBLIGATOIRE à la fin !)
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => res.send('✅ API SafeNote (ES Modules) en ligne !'));
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/admin', adminRoutes);

// Base de données
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connecté'))
  .catch(err => console.log(err));

// HTTPS
const PORT = process.env.PORT || 5000;
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`🔒 Serveur HTTPS lancé sur le port ${PORT}`);
});