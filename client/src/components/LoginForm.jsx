import { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = ({ isLogin, onLogin, onRegister }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    name: '',
    title: '',
    address: '',
    ice: '',
    inpe: '',
    taxId: '',
    taxPro: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Connexion
      onLogin({
        phone: formData.phone,
        password: formData.password
      });
    } else {
      // Inscription
      onRegister(formData);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Téléphone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {!isLogin && (
        <>
          <div className="form-group">
            <label>Nom d'entreprise</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Titre/fonction</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>ICE</label>
            <input
              type="text"
              name="ice"
              value={formData.ice}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>INPE</label>
            <input
              type="text"
              name="inpe"
              value={formData.inpe}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>ID Fiscal</label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>ID Prof</label>
            <input
              type="text"
              name="taxPro"
              value={formData.taxPro}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <button type="submit">
        {isLogin ? 'Se connecter' : 'S\'inscrire'}
      </button>
    </form>
  );
};

export default LoginForm;