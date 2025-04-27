import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/FactureTable.css';

function FactureTable({ items, removeItem, totals }) {
  return (
    <div className="facture-table">
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>DESIGNATION</th>
            <th>QUANTITE</th>
            <th>P.U.H.T (DH)</th>
            <th>P.U.TTC (DH)</th>
            <th>P.T.H.T (DH)</th>
            <th>P.T.TTC (DH)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="8" className="empty-table">
                Aucun article ajouté. Utilisez le formulaire ci-dessus pour ajouter des articles.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.designation}</td>
                <td>{item.quantity}</td>
                <td>{item.priceHT.toFixed(2)}</td>
                <td>{item.priceTTC.toFixed(2)}</td>
                <td>{(item.priceHT * item.quantity).toFixed(2)}</td>
                <td>{(item.priceTTC * item.quantity).toFixed(2)}</td>
                <td>
                  <button 
                    className="btn-remove" 
                    onClick={() => removeItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total-label">TOTAL</td>
            <td className="total-value">{totals.totalPUHT.toFixed(2)}</td>
            <td className="total-value">{totals.totalPUTTC.toFixed(2)}</td>
            <td className="total-value">{totals.totalHT.toFixed(2)}</td>
            <td className="total-value">{totals.totalTTC.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default FactureTable;