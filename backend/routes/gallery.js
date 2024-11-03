const express = require('express');
const Gallery = require('../models/Gallery');
const { authenticateAdmin } = require('../middlewares/auth');
const upload = require('../config/multer');

const router = express.Router();

// Ajouter une image à la galerie
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, category } = req.body;
    const image = await Gallery.create({
      image: `uploads/knife/${req.file.filename}`,
      title,
      category,
    });
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

router.get('/category/:category', async (req, res) => {
  try {
    const images = await Gallery.findAll({
      where: { category: req.params.category }
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const image = await Gallery.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    await image.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;