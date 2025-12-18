import React, { useEffect, useState, useContext } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const { logout } = useContext(AuthContext);
  
  // Gestion du Mode Sombre (Ajouté)
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Appliquer le thème au corps de la page
    if (darkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [darkMode]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur chargement users", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("⛔ Êtes-vous sûr de vouloir bannir cet utilisateur définitivement ?")) return;
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div>
      {/* Navbar Admin */}
      <nav className="navbar" style={{ background: 'linear-gradient(90deg, #1e1b4b, #312e81)', borderBottom: 'none' }}>
        <span className="logo" style={{ color: 'white', background: 'none', WebkitTextFillColor: 'white' }}>
          🛡️ Admin<span style={{opacity: 0.7, fontSize: '0.8em'}}>Panel</span>
        </span>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          
          {/* Bouton Dark Mode (Ajouté) */}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="btn" 
            style={{ background: 'rgba(255,255,255,0.2)', fontSize: '1.2rem', padding: '5px 10px', border: 'none', color: 'white' }}
            title="Changer le thème"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <Link to="/dashboard" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            ⬅️ Retour Site
          </Link>
          <button onClick={logout} className="btn" style={{ background: '#ef4444', color: 'white', border: 'none' }}>
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="container">
        
        {/* En-tête Statistique */}
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem', color: 'var(--text-main)' }}>Gestion des Utilisateurs</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Vous supervisez actuellement <strong>{users.length}</strong> utilisateur{users.length > 1 ? 's' : ''} inscrit{users.length > 1 ? 's' : ''}.
          </p>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="glass-card animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Utilisateur</th>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</th>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Rôle</th>
                <th style={{ padding: '20px', color: 'var(--text-secondary)', textAlign: 'right', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '20px', fontWeight: '600', color: 'var(--text-main)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '35px', height: '35px', borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontWeight: 'bold', fontSize: '0.9rem' 
                      }}>
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      {u.username}
                    </div>
                  </td>
                  <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: '20px' }}>
                    {u.role === 'admin' ? (
                      <span style={{ background: '#dbeafe', color: '#1e40af', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.5px' }}>
                        👑 ADMIN
                      </span>
                    ) : (
                      <span style={{ background: '#f3f4f6', color: '#374151', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                        👤 USER
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '20px', textAlign: 'right' }}>
                    {u.role !== 'admin' && (
                      <button 
                        onClick={() => deleteUser(u._id)}
                        className="btn"
                        style={{ padding: '8px 16px', background: '#fee2e2', color: '#dc2626', fontSize: '0.85rem', border: '1px solid #fecaca' }}
                        title="Bannir cet utilisateur"
                      >
                        🗑️ Bannir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Chargement des données...</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;