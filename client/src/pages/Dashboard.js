import React, { useEffect, useState, useContext } from 'react';
import axios from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import NoteItem from '../components/NoteItem';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  
  // États Fonctionnalités
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Personnel' });
  const [editingId, setEditingId] = useState(null); // ID si on modifie
  const [searchTerm, setSearchTerm] = useState(''); // Barre de recherche
  const [filterCategory, setFilterCategory] = useState('All'); // Filtre catégorie
  const [darkMode, setDarkMode] = useState(false); // Mode Sombre

  // Gestion du Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Chargement initial
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/notes');
      setNotes(res.data);
    } catch (err) { console.error(err); }
  };

  // Gestion Formulaire
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        // Mode Simulation Édition (Supprime + Crée)
        await axios.delete(`/notes/${editingId}`);
        const res = await axios.post('/notes', formData);
        // On remet la note à jour dans la liste locale sans recharger
        setNotes([res.data, ...notes.filter(n => n._id !== editingId)]);
        setEditingId(null);
      } else {
        // Mode Création
        const res = await axios.post('/notes', formData);
        setNotes([res.data, ...notes]);
      }
      setFormData({ title: '', content: '', category: 'Personnel' });
    } catch (err) { alert("Erreur opération"); }
  };

  // Préparer l'édition
  const startEdit = (note) => {
    setEditingId(note._id);
    setFormData({ title: note.title, content: note.content, category: note.category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteNote = async (id) => {
    if(!window.confirm("Supprimer cette note ?")) return;
    try {
      await axios.delete(`/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) { alert("Erreur suppression"); }
  };

  // Logique de Filtrage
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || note.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Salutation dynamique
  const getGreeting = () => {
    const h = new Date().getHours();
    if(h < 12) return "Bonjour";
    if(h < 18) return "Bonne après-midi";
    return "Bonsoir";
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <span className="logo">✨ SafeNote</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Bouton Dark Mode */}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="btn" 
            style={{ background: 'transparent', fontSize: '1.2rem', padding: '5px' }}
            title="Changer le thème"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          {user && user.role === 'admin' && (
            <a href="/admin" className="btn" style={{color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)'}}>🛡️ Admin</a>
          )}
          <button onClick={logout} className="btn btn-logout">Déconnexion</button>
        </div>
      </nav>

      <div className="container">
        
        {/* Héro */}
        <div className="animate-fade-in" style={{ marginBottom: '30px' }}>
          <h1 style={{ margin: '0 0 10px 0' }}>{getGreeting()}, <span style={{color: '#4f46e5'}}>{user && user.username}</span> 👋</h1>
          <p style={{ opacity: 0.7 }}>Vous avez <strong>{notes.length}</strong> note{notes.length > 1 ? 's' : ''} dans votre coffre.</p>
        </div>

        {/* Formulaire Intelligent */}
        <div className="glass-card animate-fade-in">
          <h3 style={{marginTop:0, marginBottom:'20px'}}>{editingId ? '✏️ Modifier la note' : '✍️ Nouvelle Note'}</h3>
          <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
              <input 
                type="text" name="title" value={formData.title} onChange={onChange} 
                placeholder="Titre de votre idée..." required style={{ flex: '2 1 300px' }} 
              />
              <select 
                name="category" value={formData.category} onChange={onChange} 
                style={{ flex: '1 1 150px', cursor: 'pointer' }}
              >
                <option>Personnel</option>
                <option>Travail</option>
                <option>Idée</option>
                <option>Urgent</option>
              </select>
            </div>
            <textarea 
              name="content" value={formData.content} onChange={onChange} 
              placeholder="Écrivez vos pensées ici..." required rows="3"
            ></textarea>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
              {editingId && (
                <button type="button" onClick={() => {setEditingId(null); setFormData({ title: '', content: '', category: 'Personnel' })}} className="btn" style={{background:'rgba(150,150,150,0.2)', color:'inherit'}}>
                  Annuler
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Mettre à jour' : '+ Créer la note'}
              </button>
            </div>
          </form>
        </div>

        {/* Barre d'outils (Recherche + Filtre) */}
        <div className="animate-fade-in" style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="🔍 Rechercher une note..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: '2 1 300px', padding: '12px' }}
          />
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ flex: '1 1 150px' }}
          >
            <option value="All">Tout voir</option>
            <option value="Personnel">Personnel</option>
            <option value="Travail">Travail</option>
            <option value="Idée">Idée</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* Liste des Notes */}
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div className="animate-fade-in" key={note._id}>
              <NoteItem note={note} onDelete={deleteNote} onEdit={startEdit} />
            </div>
          ))}
        </div>
        
        {filteredNotes.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '50px', opacity: 0.6 }}>
            <h3>Aucune note trouvée... 🍃</h3>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;