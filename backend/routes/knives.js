const express = require('express');
const Knife = require('../models/Knife');
const { authenticateAdmin } = require('../middlewares/auth');

const router = express.Router();

// Ajouter un couteau
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const knife = await Knife.create(req.body);
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

module.exports = router;