import { useState } from 'react';
import '../styles/FactureForm.css';

function FactureForm({ addItem }) {
  const [formData, setFormData] = useState({
    designation: '',
    quantity: '',
    priceHT: '',
    priceTTC: '',
    isPriceHT: false
  });  

  const TVA = 0.2; // 20% TVA

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) || '' : value;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: newValue };
      
      // Recalculer les prix en fonction de ce qui a été modifié
      if (name === 'priceHT' && newData.isPriceHT) {
        newData.priceTTC = parseFloat((newData.priceHT * (1 + TVA)).toFixed(2));
      } else if (name === 'priceTTC' && !newData.isPriceHT) {
        newData.priceHT = parseFloat((newData.priceTTC / (1 + TVA)).toFixed(2));
      }
      
      return newData;
    });
  };

  const handlePriceTypeChange = (e) => {
    const isPriceHT = e.target.value === 'HT';
    
    setFormData(prev => {
      const newData = { ...prev, isPriceHT };
      
      // Recalculer le prix approprié
      if (isPriceHT) {
        newData.priceTTC = parseFloat((newData.priceHT * (1 + TVA)).toFixed(2));
      } else {
        newData.priceHT = parseFloat((newData.priceTTC / (1 + TVA)).toFixed(2));
      }
      
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier que les champs sont valides
    if (!formData.designation || formData.quantity <= 0) {
      alert('Veuillez remplir tous les champs correctement');
      return;
    }
    
    // Ajouter l'article à la liste
    addItem({
      designation: formData.designation,
      quantity: formData.quantity,
      priceHT: formData.priceHT,
      priceTTC: formData.priceTTC,
      totalHT: formData.priceHT * formData.quantity,
      totalTTC: formData.priceTTC * formData.quantity
    });
    
    // Réinitialiser le formulaire
    setFormData({
      designation: '',
      quantity: '',
      priceHT: '',
      priceTTC: '',
      isPriceHT: false
    });    
  };

  return (
    <div className="facture-form">
      <h2>Ajouter un article</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Désignation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Quantité:</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Type de prix:</label>
          <div className="price-type-toggle">
            <label>
              <input
                type="radio"
                name="priceType"
                value="HT"
                checked={formData.isPriceHT}
                onChange={handlePriceTypeChange}
              />
              Prix HT
            </label>
            <label>
              <input
                type="radio"
                name="priceType"
                value="TTC"
                checked={!formData.isPriceHT}
                onChange={handlePriceTypeChange}
              />
              Prix TTC
            </label>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Prix HT (DH):</label>
            <input
              type="number"
              name="priceHT"
              min="0"
              step="0.01"
              value={formData.priceHT}
              onChange={handleChange}
              disabled={!formData.isPriceHT}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Prix TTC (DH):</label>
            <input
              type="number"
              name="priceTTC"
              min="0"
              step="0.01"
              value={formData.priceTTC}
              onChange={handleChange}
              disabled={formData.isPriceHT}
              required
            />
          </div>
        </div>
        
        <button type="submit" className="btn-add">Ajouter l'article</button>
      </form>
    </div>
  );
}

export default FactureForm;
