const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Knife = sequelize.define('Knife', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  texte: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  taille_lame: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categorie: {
    type: DataTypes.ENUM('cuisine', 'outdoor', 'pliant', 'exception'),
    allowNull: false,
  },
});

module.exports = Knife;