const express = require('express');
const Gallery = require('../models/Gallery');
const { authenticateAdmin } = require('../middlewares/auth');

const router = express.Router();

// Ajouter une image à la galerie
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const image = await Gallery.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer toutes les images de la galerie
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.findAll();
    res.json(images);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;