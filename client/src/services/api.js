// src/services/api.js
import axios from 'axios';

const API_URL = 'https://facture-app-production.up.railway.app/api';

// Configurer les headers pour les requêtes authentifiées
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Vérifier le token au chargement
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

const api = {
  // Inscription
  register: async (userData) => {
    const res = await axios.post(`${API_URL}/register`, userData);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
    }
    return res.data;
  },
  
  // Connexion
  login: async (credentials) => {
    const res = await axios.post(`${API_URL}/login`, credentials);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
    }
    return res.data;
  },
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  },
  
  // Récupérer les informations utilisateur
  getUserInfo: async () => {
    const res = await axios.get(`${API_URL}/user`);
    return res.data;
  },
  
  // Mettre à jour les informations utilisateur
  updateUserInfo: async (userData) => {
    const res = await axios.put(`${API_URL}/user`, userData);
    return res.data;
  },
  
  // incrémenter le numéro de facture
  changeFactureNumber: async () => {
    const res = await axios.get(`${API_URL}/change-facture-number`);
    return res.data.factureNumber;
  }
};

export default api;
