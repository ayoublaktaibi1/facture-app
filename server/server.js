const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');

// Configuration
dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://facture-app-flax.vercel.app',
  credentials: true
}));
app.use(express.json());

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB Atlas'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Middleware d'authentification
const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Route d'inscription
app.post('/api/register', async (req, res) => {
  try {
    const { phone, password, name, title, address, ice, inpe, taxId, taxPro } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }
    
    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Créer nouvel utilisateur
    user = new User({
      phone,
      password: hashedPassword,
      name,
      title,
      address,
      ice,
      inpe,
      taxId,
      taxPro,
      factureNumber: 1
    });
    
    await user.save();
    
    // Générer JWT
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );
    
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route de connexion
app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }
    
    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }
    
    // Générer JWT
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );
    
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour obtenir les informations utilisateur
app.get('/api/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour mettre à jour les informations utilisateur
app.put('/api/user', auth, async (req, res) => {
  try {
    const { name, title, address, ice, inpe, taxId, taxPro } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, title, address, ice, inpe, taxId, taxPro },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour incrémenter le numéro de facture
app.get('/api/change-facture-number', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Incrémenter le numéro de facture
    user.factureNumber += 1;
    await user.save();
    
    res.json({ factureNumber: user.factureNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
