import { useState, useEffect } from 'react';
import './styles/App.css';
import FactureForm from './components/FactureForm';
import FactureTable from './components/FactureTable';
import FactureFooter from './components/FactureFooter';
import FactureHeader from './components/FactureHeader';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import api from './services/api';

function App() {
  const [items, setItems] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    clientName: '',
    date: new Date().toISOString().slice(0, 10),
    factureNumber: '',
    sellerInfo: {
      name: '',
      title: '',
      address: '',
      ice: '',
      inpe: '',
      taxId: '',
      taxPro: ''
    }
  });
  const [notification, setNotification] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true); // true pour login, false pour register

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      loadUserData();
    }
  }, []);

  // Charger les données utilisateur
  const loadUserData = async () => {
    try {
      const userData = await api.getUserInfo();
      
      // Mettre à jour les informations du vendeur
      setClientInfo(prev => ({
        ...prev,
        factureNumber: userData.factureNumber,
        sellerInfo: {
          name: userData.name || '',
          title: userData.title || '',
          address: userData.address || '',
          ice: userData.ice || '',
          inpe: userData.inpe || '',
          taxId: userData.taxId || '',
          taxPro: userData.taxPro || ''
        }
      }));
    } catch (error) {
      console.error('Erreur chargement données:', error);
      showNotification('Erreur lors du chargement des données', 'error');
    }
  };

  const addItem = (newItem) => {
    const itemWithId = { ...newItem, id: Date.now() };
    setItems([...items, itemWithId]);
    showNotification('Article ajouté avec succès', 'success');
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    showNotification('Article supprimé', 'info');
  };

  const updateClientInfo = async (info) => {
    setClientInfo({ ...clientInfo, ...info });
    
    // Si l'utilisateur est authentifié et les infos du vendeur sont mises à jour
    if (isAuthenticated && info.sellerInfo) {
      try {
        await api.updateUserInfo({
          name: info.sellerInfo.name,
          title: info.sellerInfo.title,
          address: info.sellerInfo.address,
          ice: info.sellerInfo.ice,
          inpe: info.sellerInfo.inpe,
          taxId: info.sellerInfo.taxId,
          taxPro: info.sellerInfo.taxPro
        });
        showNotification('Informations vendeur mises à jour', 'success');
      } catch (error) {
        showNotification('Erreur lors de la mise à jour des informations', 'error');
      }
    } else {
      showNotification('Informations client mises à jour', 'success');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    
    // Nettoyer la notification après 3 secondes
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = async (credentials) => {
    try {
      await api.login(credentials);
      setIsAuthenticated(true);
      loadUserData();
      showNotification('Connexion réussie', 'success');
    } catch (error) {
      showNotification('Erreur de connexion: ' + (error.response?.data?.message || 'Erreur inconnue'), 'error');
    }
  };

  const handleRegister = async (userData) => {
    try {
      await api.register(userData);
      setIsAuthenticated(true);
      loadUserData();
      showNotification('Inscription réussie', 'success');
    } catch (error) {
      showNotification('Erreur d\'inscription: ' + (error.response?.data?.message || 'Erreur inconnue'), 'error');
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    showNotification('Déconnexion réussie', 'info');
  };

  // Calculer les totaux
  const totals = items.reduce((acc, item) => {
    acc.totalPUHT += item.priceHT;
    acc.totalPUTTC += item.priceTTC;
    acc.totalHT += item.priceHT * item.quantity;
    acc.totalTTC += item.priceTTC * item.quantity;
    return acc;
  }, { totalPUHT: 0, totalPUTTC: 0, totalHT: 0, totalTTC: 0 });

  return (
    <div className="app-container">      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}

      {!isAuthenticated ? (
        <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={isLoginForm ? 'active' : ''} 
              onClick={() => setIsLoginForm(true)}
            >
              Connexion
            </button>
            <button 
              className={!isLoginForm ? 'active' : ''} 
              onClick={() => setIsLoginForm(false)}
            >
              Inscription
            </button>
          </div>
          
          <LoginForm 
            isLogin={isLoginForm} 
            onLogin={handleLogin} 
            onRegister={handleRegister} 
          />
        </div>
      ) : (
        <>
          <div className="user-controls">
            <img src="/realfacture.svg"/>
            <h1>Realfacture</h1>
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
          
          <div className="facture-container">
            <FactureHeader clientInfo={clientInfo} updateClientInfo={updateClientInfo} />
            
            <FactureForm addItem={addItem} />
            
            <FactureTable
              items={items}
              removeItem={removeItem}
              totals={totals}
            />
            
            <FactureFooter
              items={items}
              totals={totals}
              clientInfo={clientInfo}
              showNotification={showNotification}
              updateClientInfo={updateClientInfo}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
