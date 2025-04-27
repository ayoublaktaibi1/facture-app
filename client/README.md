# Générateur de Factures

Une application web complète pour créer et générer des factures professionnelles en PDF. Construite avec React (Vite), CSS personnalisé et Node.js.

## Fonctionnalités

- Interface utilisateur intuitive et responsive
- Ajout/suppression d'articles avec calcul automatique HT/TTC
- Conversion des montants en texte
- Génération de PDF professionnels
- Personnalisation des informations du client et du vendeur
- Visualisation en temps réel de la facture

## Structure du projet

```
facture-app/
├── client/                  # Frontend React (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── assets/          # Images, styles globaux, etc.
│   │   ├── App.jsx          # Composant principal
│   │   ├── main.jsx         # Point d'entrée
│   │   └── styles/          # Fichiers CSS
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── server/                  # Backend Node.js
    ├── controllers/         # Fonctions de contrôle
    ├── routes/              # Routes API
    ├── utils/               # Utilitaires (génération PDF)
    ├── server.js            # Point d'entrée du serveur
    └── package.json
```

## Prérequis

- Node.js (v14 ou plus récent)
- NPM ou Yarn

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/votre-nom/facture-app.git
   cd facture-app
   ```

2. Installez les dépendances pour le client :
   ```bash
   cd client
   npm install
   ```

3. Installez les dépendances pour le serveur :
   ```bash
   cd ../server
   npm install
   ```

## Démarrage de l'application

1. Démarrez le serveur backend :
   ```bash
   cd server
   npm start
   ```

2. Dans un autre terminal, démarrez le client :
   ```bash
   cd client
   npm run dev
   ```

3. Ouvrez votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000)

## Guide d'utilisation

1. **Informations du client**
   - Cliquez sur "Modifier les informations" pour mettre à jour les détails du client

2. **Ajouter des articles**
   - Remplissez le formulaire d'ajout d'article
   - Sélectionnez le type de prix (HT ou TTC)
   - Cliquez sur "Ajouter l'article"

3. **Générer une facture PDF**
   - Une fois tous les articles ajoutés, cliquez sur "Télécharger en PDF"
   - Le PDF généré sera automatiquement téléchargé

## Personnalisation

Vous pouvez personnaliser l'application selon vos besoins :

- Modifiez les styles dans les fichiers CSS
- Ajoutez votre logo dans les composants d'en-tête
- Ajustez le taux de TVA dans le composant FactureForm
- Personnalisez le format du PDF généré

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.