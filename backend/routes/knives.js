const express = require('express');
const Knife = require('../models/Knife');
const { authenticateAdmin } = require('../middlewares/auth');
const upload = require('../config/multer');

const router = express.Router();

// Ajouter un couteau
router.post('/', authenticateAdmin, upload.array('images', 10), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    const { nom, prix, texte, taille_lame, categorie } = req.body;
    const images = req.files.map(file => `uploads/knife/${file.filename}`);
    
    const knife = await Knife.create({
      nom,
      prix: parseFloat(prix),
      texte,
      taille_lame: parseFloat(taille_lame),
      images,
      categorie
    });

    res.status(201).json(knife);
  } catch (error) {
    console.error('Error creating knife:', error);
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les couteaux
router.get('/', async (req, res) => {
  try {
    const knives = await Knife.findAll();
    res.json(knives);
  } catch (error) {
    console.error('Error fetching knives:', error);
    res.status(400).json({ error: error.message });
  }
});

// Récupérer un couteau par ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const knife = await Knife.findByPk(id);
    if (!knife) {
      return res.status(404).json({ error: 'Couteau non trouvé' });
    }
    res.json(knife);
  } catch (error) {
    console.error('Error fetching knife:', error);
    res.status(400).json({ error: error.message });
  }
});

// Supprimer un couteau
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const knife = await Knife.findByPk(req.params.id);
    if (!knife) {
      return res.status(404).json({ error: 'Couteau non trouvé' });
    }
    await knife.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting knife:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;