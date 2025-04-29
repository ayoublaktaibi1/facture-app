import { useState } from 'react';
import '../styles/FactureHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function FactureHeader({ clientInfo, updateClientInfo }) {
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [isEditingSeller, setIsEditingSeller] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...clientInfo });
  const [editedSellerInfo, setEditedSellerInfo] = useState({ ...clientInfo.sellerInfo });

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({
      ...editedInfo,
      [name]: value
    });
  };

  const handleSellerChange = (e) => {
    const { name, value } = e.target;
    setEditedSellerInfo({
      ...editedSellerInfo,
      [name]: value
    });
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    updateClientInfo(editedInfo);
    setIsEditingClient(false);
  };

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    updateClientInfo({ 
      ...clientInfo, 
      sellerInfo: editedSellerInfo 
    });
    setIsEditingSeller(false);
  };

  return (
    <div className="facture-header">
      {/* Formulaire d'édition des informations client */}
      {isEditingClient ? (
        <form onSubmit={handleClientSubmit} className="header-edit-form">
          <h3>Modifier les informations de facture</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nom du client:</label>
              <input
                type="text"
                name="clientName"
                value={editedInfo.clientName}
                onChange={handleClientChange}
              />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={editedInfo.date}
                onChange={handleClientChange}
              />
            </div>
            <div className="form-group">
              <label>N° de facture:</label>
              <input
                type="text"
                name="factureNumber"
                value={editedInfo.factureNumber}
                onChange={handleClientChange}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setIsEditingClient(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : isEditingSeller ? (
        /* Formulaire d'édition des informations vendeur */
        <form onSubmit={handleSellerSubmit} className="header-edit-form seller-edit-form">
          <h3>Modifier vos informations</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nom:</label>
              <input
                type="text"
                name="name"
                value={editedSellerInfo.name}
                onChange={handleSellerChange}
                placeholder="Nom de l'entreprise"
              />
            </div>
            <div className="form-group">
              <label>Titre/fonction:</label>
              <input
                type="text"
                name="title"
                value={editedSellerInfo.title}
                onChange={handleSellerChange}
                placeholder="Titre ou fonction"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Adresse:</label>
              <input
                type="text"
                name="address"
                value={editedSellerInfo.address}
                onChange={handleSellerChange}
                placeholder="Adresse complète"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>ICE:</label>
              <input
                type="text"
                name="ice"
                value={editedSellerInfo.ice}
                onChange={handleSellerChange}
                placeholder="ICE"
              />
            </div>
            <div className="form-group">
              <label>INPE:</label>
              <input
                type="text"
                name="inpe"
                value={editedSellerInfo.inpe}
                onChange={handleSellerChange}
                placeholder="INPE"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Identifiant fiscal:</label>
              <input
                type="text"
                name="taxId"
                value={editedSellerInfo.taxId}
                onChange={handleSellerChange}
                placeholder="Identifiant fiscal"
              />
            </div>
            <div className="form-group">
              <label>Taxe professionnelle N°:</label>
              <input
                type="text"
                name="taxPro"
                value={editedSellerInfo.taxPro}
                onChange={handleSellerChange}
                placeholder="N° Taxe professionnelle"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setIsEditingSeller(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="header-content">
          <div className="seller-info">
            <div className="titre-bouton">
              <h2>{clientInfo.sellerInfo.name}</h2>
              <button
                onClick={() => {
                  setEditedSellerInfo({ ...clientInfo.sellerInfo });
                  setIsEditingSeller(true);
                }}
                className="btn-seller-edit"
              >
              <FontAwesomeIcon icon={faPen} />  
              </button>
            </div>
            <p>{clientInfo.sellerInfo.title}</p>
            <p>{clientInfo.sellerInfo.address}</p>
            <div className="seller-details">
              <p><strong>ICE:</strong> {clientInfo.sellerInfo.ice}</p>
              <p><strong>INPE:</strong> {clientInfo.sellerInfo.inpe}</p>
              <p><strong>Identifiant fiscal:</strong> {clientInfo.sellerInfo.taxId}</p>
              <p><strong>Taxe Professionnelle N°:</strong> {clientInfo.sellerInfo.taxPro}</p>
            </div>
          </div>
         
          <div className="facture-info">
            <h2>FACTURE N°{clientInfo.factureNumber}</h2>
            <p>Date: {new Date(clientInfo.date).toLocaleDateString('fr-FR')}</p>
            <p>Doit: <strong>{clientInfo.clientName || 'CLIENT'}</strong></p>
            <button
              onClick={() => {
                setEditedInfo({ ...clientInfo });
                setIsEditingClient(true);
              }}
              className="btn-edit client-edit"
            >
              Modifier les infos de facture
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FactureHeader;
