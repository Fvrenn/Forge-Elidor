const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Accès refusé' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

const authenticateAdmin = (req, res, next) => {
  authenticateUser(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    next();
  });
};

module.exports = { authenticateUser, authenticateAdmin };