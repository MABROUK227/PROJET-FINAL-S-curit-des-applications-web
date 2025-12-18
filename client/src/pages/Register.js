import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
        
        {/* Titre avec effet dégradé */}
        <h1 style={{ 
          background: 'linear-gradient(45deg, #4f46e5, #ec4899)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          fontSize: '2.5rem', 
          marginBottom: '10px',
          fontWeight: '800'
        }}>
          SafeNote
        </h1>
        
        <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '1.1rem' }}>
          Créez votre coffre-fort numérique.
        </p>
        
        {error && (
          <div style={{ 
            background: '#fee2e2', color: '#b91c1c', 
            padding: '12px', borderRadius: '8px', 
            marginBottom: '20px', fontSize: '0.9rem', border: '1px solid #fca5a5' 
          }}>
            ⚠️ {error}
          </div>
        )}
        
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Nom d'utilisateur" 
            value={formData.username} 
            onChange={e => setFormData({...formData, username: e.target.value})} 
            required 
          />
          <input 
            type="email" 
            placeholder="Adresse Email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            placeholder="Mot de passe (6 carac. min)" 
            value={formData.password} 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', padding: '15px', fontSize: '1rem' }}>
            Commencer l'aventure 🚀
          </button>
        </form>
        
        <div style={{ marginTop: '25px', fontSize: '0.95rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
          Déjà membre ? <br/>
          <Link to="/login" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>
            Se connecter ici
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;