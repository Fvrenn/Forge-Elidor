const express = require('express');
const Knife = require('../models/Knife');
const { authenticateAdmin } = require('../middlewares/auth');
const upload = require('../config/multer');

const router = express.Router();

// Ajouter un couteau
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { nom, prix, texte, taille_lame, categorie } = req.body;
    const image = req.file ? `uploads/knife/${req.file.filename}` : null;
    const knife = await Knife.create({ nom, prix, texte, taille_lame, image, categorie });
    res.status(201).json(knife);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer tous les couteaux
router.get('/', async (req, res) => {
  try {
    const knives = await Knife.findAll();
    res.json(knives);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer un couteau par ID
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const knife = await Knife.findByPk(id);
    if (!knife) {
      return res.status(404).json({ error: 'Couteau non trouvé' });
    }
    await knife.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;