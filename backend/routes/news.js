const express = require('express');
const News = require('../models/News');
const { authenticateAdmin } = require('../middlewares/auth');
const upload = require('../config/multer');

const router = express.Router();

router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    const { title, publicationDate, content } = req.body;
    const imagePath = req.file ? `uploads/news/${req.file.filename}` : null;
    
    const news = await News.create({
      titre: title,
      contenu: content,
      date_publication: publicationDate,
      image: imagePath
    });
    
    res.status(201).json(news);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ error: 'Actualité non trouvée' });
    }
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'Actualité non trouvée' });
    }
    await news.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findByPk(id);
    
    if (!news) {
      return res.status(404).json({ error: 'Actualité non trouvée' });
    }
    
    const { title, publicationDate, content } = req.body;
    
    // Préparer les données à mettre à jour
    const updateData = {
      titre: title,
      contenu: content,
      date_publication: publicationDate
    };
    
    // Mettre à jour l'image uniquement si une nouvelle est fournie
    if (req.file) {
      updateData.image = `uploads/news/${req.file.filename}`;
    }
    
    // Mettre à jour l'actualité
    await news.update(updateData);
    
    // Récupérer l'actualité mise à jour
    const updatedNews = await News.findByPk(id);
    
    res.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;