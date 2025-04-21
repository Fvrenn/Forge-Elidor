const multer = require('multer');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
if (!fs.existsSync('uploads/knife')) {
  fs.mkdirSync('uploads/knife');
}
if (!fs.existsSync('uploads/news')) {
  fs.mkdirSync('uploads/news');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const url = req.originalUrl.toLowerCase();
    let uploadPath = 'uploads/';
    
    if (url.includes('knives')) {
      uploadPath += 'knife/';
    } else if (url.includes('news')) {
      uploadPath += 'news/';
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;