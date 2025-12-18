import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Email ou mot de passe incorrect');
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
          Ravi de vous revoir ! 👋
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
            type="email" 
            placeholder="Votre Email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            placeholder="Votre Mot de passe" 
            value={formData.password} 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', padding: '15px', fontSize: '1rem' }}>
            Se connecter 🔓
          </button>
        </form>
        
        <div style={{ marginTop: '25px', fontSize: '0.95rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
          Pas encore de compte ? <br/>
          <Link to="/register" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>
            Créer un compte gratuitement
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;