// fileUpload.js
const multer = require('multer');

const storage = multer.memoryStorage(); // stores file in memory as Buffer

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;
