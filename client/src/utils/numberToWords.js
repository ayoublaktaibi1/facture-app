// utils/numberToWords.js

// Fonction pour convertir un nombre en texte français
export function convertNumberToWords(number) {
    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
  
    // Arrondir à deux décimales et séparer la partie entière et les décimales
    const rounded = Math.round(number * 100) / 100;
    let [integerPart, decimalPart] = rounded.toString().split('.');
    
    // Convertir en nombre
    integerPart = parseInt(integerPart);
    
    if (integerPart === 0) {
      return 'zéro';
    }
  
    function convertLessThanOneThousand(num) {
      if (num === 0) {
        return '';
      }
  
      if (num < 20) {
        return units[num];
      }
  
      if (num < 70) {
        return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + units[num % 10] : '');
      }
  
      if (num < 80) {
        return 'soixante' + (num - 70 >= 1 ? '-' + units[num - 70] : '');
      }
  
      if (num < 90) {
        return 'quatre-vingt' + (num % 10 !== 0 ? '-' + units[num % 10] : '');
      }
  
      return 'quatre-vingt-' + units[num - 90];
    }
  
    let words = '';
  
    // Traiter les milliers
    if (integerPart >= 1000) {
      const thousands = Math.floor(integerPart / 1000);
      words += (thousands === 1 ? 'mille ' : convertLessThanOneThousand(thousands) + ' mille ');
      integerPart %= 1000;
    }
  
    // Traiter les centaines
    if (integerPart >= 100) {
      const hundreds = Math.floor(integerPart / 100);
      words += (hundreds === 1 ? 'cent ' : convertLessThanOneThousand(hundreds) + ' cent ');
      integerPart %= 100;
    }
  
    // Traiter le reste
    if (integerPart > 0) {
      words += convertLessThanOneThousand(integerPart);
    }
  
    return words.trim();
  }