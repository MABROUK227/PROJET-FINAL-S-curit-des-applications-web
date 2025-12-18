import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axios'; // On utilise notre axios configuré
import { jwtDecode } from 'jwt-decode'; // Pour lire les infos cachées dans le token

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Vérifier si un token existe au chargement de la page
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Vérifier si le token n'est pas expiré
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded.user);
          axios.defaults.headers.common['x-auth-token'] = token;
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  // Fonction de Connexion
  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    const decoded = jwtDecode(res.data.token);
    setUser(decoded.user);
  };

  // Fonction d'Inscription
  const register = async (username, email, password) => {
    const res = await axios.post('/auth/register', { username, email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    const decoded = jwtDecode(res.data.token);
    setUser(decoded.user);
  };

  // Fonction de Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['x-auth-token'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};