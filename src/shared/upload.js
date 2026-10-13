const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// uploads/ en la raiz del proyecto (dos niveles arriba de src/shared/)
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');

// nos aseguramos de que la carpeta exista (ej: clones nuevos del repo)
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, crypto.randomUUID() + ext);   // nombre unico, evita colisiones
  }
});

const fileFilter = (req, file, cb) => {
  const permitidos = ['image/jpeg', 'image/png', 'image/webp'];
  if (permitidos.includes(file.mimetype)) return cb(null, true);
  cb(new Error('Formato de imagen no permitido (solo JPG, PNG, WEBP)'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }   // 5 MB
});

module.exports = { upload, UPLOAD_DIR };