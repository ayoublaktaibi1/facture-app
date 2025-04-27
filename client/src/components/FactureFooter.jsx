import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FacturePDF from './FacturePDF';
import { convertNumberToWords } from '../utils/numberToWords';
import '../styles/FactureFooter.css';
import api from '../services/api';

function FactureFooter({ totals, clientInfo, items, showNotification, updateClientInfo }) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Conversion des montants en texte
  const totalHTText = convertNumberToWords(totals.totalHT);
  const totalTTCText = convertNumberToWords(totals.totalTTC);

  const handleGeneratePDF = () => {
    if (items.length === 0) {
      showNotification('Veuillez ajouter au moins un article', 'warning');
      return;
    }
    setIsGenerating(true);
  };

  const handlePDFDownload = async () => {
    try {
      // Appeler l'API pour incrémenter le numéro de facture
      const newFactureNumber = await api.changeFactureNumber();
      
      updateClientInfo({
        ...clientInfo,
        factureNumber: newFactureNumber
      });
      
      showNotification('PDF généré avec succès et numéro de facture incrémenté!', 'success');
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation du numéro de facture:', error);
      showNotification('PDF généré, mais erreur lors de la mise à jour du numéro de facture', 'warning');
    }
  };

  return (
    <div className="facture-footer">
      <div className="totals-in-words">
        <p>Arrêter le présent facture H.T à la somme de:</p>
        <p className="amount-in-words">{totalHTText} Dirhams</p>
        
        <p>Arrêter le présent facture TTC à la somme de:</p>
        <p className="amount-in-words">{totalTTCText} Dirhams</p>
      </div>
      
      <div className="footer-actions">
        {isGenerating ? (
          <PDFDownloadLink
            document={
              <FacturePDF 
                clientInfo={clientInfo}
                items={items}
                totals={totals}
                totalHTText={totalHTText}
                totalTTCText={totalTTCText}
              />
            }
            fileName={`facture_${clientInfo.factureNumber}_${clientInfo.clientName || 'client'}.pdf`}
            className="btn-generate-pdf"
            onClick={handlePDFDownload}
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Génération du PDF...' : 'Télécharger le PDF'
            }
          </PDFDownloadLink>
        ) : (
          <button 
            className="btn-generate-pdf" 
            onClick={handleGeneratePDF}
            disabled={items.length === 0}
          >
            Générer le PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default FactureFooter;