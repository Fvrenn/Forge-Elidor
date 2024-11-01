const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const knifeRoutes = require('./routes/knives');
const newsRoutes = require('./routes/news');
const galleryRoutes = require('./routes/gallery');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/knives', knifeRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});