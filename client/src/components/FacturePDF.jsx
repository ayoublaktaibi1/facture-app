// components/FacturePDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Ajout de polices personnalisées
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

// Création des styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1pt solid #CCCCCC',
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sellerInfo: {
    width: '60%',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 10,
    color: '#555555',
    marginBottom: 3,
  },
  factureInfo: {
    width: '40%',
    alignItems: 'flex-end',
  },
  factureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 5,
  },
  factureDetails: {
    fontSize: 10,
    marginBottom: 3,
  },
  clientName: {
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: 5,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginVertical: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    backgroundColor: '#34495e',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    fontSize: 10,
    paddingTop: 3,
    paddingBottom: 3,
  },
  tableRowEven: {
    backgroundColor: '#F8F9FA',
  },
  tableCell: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  indexCell: {
    minWidth: '5%',
    textAlign: 'center',
  },
  designationCell: {
    width: '27%',
  },
  quantityCell: {
    width: '8%',
    textAlign: 'center',
  },
  priceCell: {
    width: '17%',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    fontSize: 10,
    fontWeight: 'bold',
  },
  totalLabelCell: {
    width: '39.5%',
    padding: 5,
    textAlign: 'right',
  },
  emptyCell: {
    width: '12%',
    padding: 5,
  },
  totalAmounts: {
    marginTop: 20,
    padding: 10,
    paddingLeft: 20,
    paddingBottom: 0,
    backgroundColor: '#F8F9FA',
    borderLeft: '4pt solid rgb(2, 192, 81)',
  },
  amountTitle: {
    fontSize: 12,
    marginBottom: 3,
  },
  amountWords: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 40,
    textTransform: 'capitalize',
  }
});

// Document PDF de facture
const FacturePDF = ({ clientInfo, items, totals, totalHTText, totalTTCText }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* En-tête de facture */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.sellerInfo}>
            <Text style={styles.companyName}>{clientInfo.sellerInfo.name}</Text>
            <Text style={styles.companyDetails}>{clientInfo.sellerInfo.title}</Text>
            <Text style={styles.companyDetails}>{clientInfo.sellerInfo.address}</Text>
            <Text style={styles.companyDetails}>ICE : {clientInfo.sellerInfo.ice}</Text>
            <Text style={styles.companyDetails}>INPE : {clientInfo.sellerInfo.inpe}</Text>
            <Text style={styles.companyDetails}>Identifiant fiscal : {clientInfo.sellerInfo.taxId}</Text>
            <Text style={styles.companyDetails}>Taxe Professionnelle N° {clientInfo.sellerInfo.taxPro}</Text>
          </View>
          
          <View style={styles.factureInfo}>
            <Text style={styles.factureTitle}>FACTURE N°{clientInfo.factureNumber}</Text>
            <Text style={styles.factureDetails}>
              Essaouira le : {new Date(clientInfo.date).toLocaleDateString('fr-FR')}
            </Text>
            <Text style={styles.clientName}>Doit : {clientInfo.clientName || 'CLIENT'}</Text>
          </View>
        </View>
      </View>

      {/* Tableau des articles */}
      <View style={styles.table}>
        {/* En-tête de tableau */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.indexCell]}>N°</Text>
          <Text style={[styles.tableCell, styles.designationCell]}>DESIGNATION</Text>
          <Text style={[styles.tableCell, styles.quantityCell]}>QTE</Text>
          <Text style={[styles.tableCell, styles.priceCell]}>P.U.H.T (DH)</Text>
          <Text style={[styles.tableCell, styles.priceCell]}>P.U.TTC (DH)</Text>
          <Text style={[styles.tableCell, styles.priceCell]}>P.T.H.T (DH)</Text>
          <Text style={[styles.tableCell, styles.priceCell]}>P.T.TTC (DH)</Text>
        </View>

        {/* Lignes du tableau */}
        {items.map((item, index) => (
          <View 
            key={item.id} 
            style={[
              styles.tableRow, 
              index % 2 === 1 ? styles.tableRowEven : {}
            ]}
          >
            <Text style={[styles.tableCell, styles.indexCell]}>{index + 1}</Text>
            <Text style={[styles.tableCell, styles.designationCell]}>{item.designation}</Text>
            <Text style={[styles.tableCell, styles.quantityCell]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, styles.priceCell]}>{item.priceHT.toFixed(2)}</Text>
            <Text style={[styles.tableCell, styles.priceCell]}>{item.priceTTC.toFixed(2)}</Text>
            <Text style={[styles.tableCell, styles.priceCell]}>
              {(item.priceHT * item.quantity).toFixed(2)}
            </Text>
            <Text style={[styles.tableCell, styles.priceCell]}>
              {(item.priceTTC * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        {/* Ligne de total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabelCell}>TOTAL</Text>
          <Text style={[styles.tableCell, styles.priceCell]}>{totals.totalPUHT.toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.priceCell]}>{totals.totalPUTTC.toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.priceCell]}>{totals.totalHT.toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.priceCell]}>{totals.totalTTC.toFixed(2)}</Text>
        </View>
      </View>

      {/* Montants en toutes lettres */}
      <View style={styles.totalAmounts}>
        <Text style={styles.amountTitle}>Arrêter le présent facture H.T à la somme de :</Text>
        <Text style={styles.amountWords}>{totalHTText} Dirhams</Text>
        
        <Text style={styles.amountTitle}>Arrêter le présent facture TTC à la somme de :</Text>
        <Text style={styles.amountWords}>{totalTTCText} Dirhams</Text>
      </View>
    </Page>
  </Document>
);

export default FacturePDF;