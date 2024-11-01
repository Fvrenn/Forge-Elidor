const express = require('express');
const News = require('../models/News');
const { authenticateAdmin } = require('../middlewares/auth');

const router = express.Router();

// Ajouter une actualité
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer toutes les actualités
router.get('/', async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;