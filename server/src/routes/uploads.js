const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const multer = require('multer');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const uploadDirectory = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const extensions = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

function hasValidSignature(filePath, mimeType) {
  const header = fs.readFileSync(filePath).subarray(0, 12);
  if (mimeType === 'image/png') return header.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (mimeType === 'image/jpeg') return header[0] === 255 && header[1] === 216 && header[2] === 255;
  if (mimeType === 'image/webp') return header.toString('ascii', 0, 4) === 'RIFF' && header.toString('ascii', 8, 12) === 'WEBP';
  return false;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => callback(null, `${crypto.randomUUID()}${extensions[file.mimetype] || ''}`),
  }),
  limits: { fileSize: 2 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!extensions[file.mimetype]) return callback(new Error('Upload a PNG, JPG, or WebP image.'));
    callback(null, true);
  },
});

router.post('/admin/uploads/image', requireAuth, (req, res) => {
  upload.single('image')(req, res, (error) => {
    if (error) {
      const status = error instanceof multer.MulterError ? 400 : 415;
      return res.status(status).json({ error: error.message });
    }
    if (!req.file) return res.status(400).json({ error: 'Choose an image to upload.' });
    if (!hasValidSignature(req.file.path, req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.status(415).json({ error: 'The file contents do not match a supported image.' });
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

module.exports = { router, uploadDirectory };