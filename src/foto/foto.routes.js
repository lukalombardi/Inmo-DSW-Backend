const { Router } = require('express');
const { upload } = require('../shared/upload.js');
const { verificarApiKey } = require('../middlewares/apiKey.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { fotoSchema } = require('./foto.schema.js');
const { getFotos, getFoto, createFoto, deleteFoto } = require('./foto.controller.js');

const router = Router();

router.get('/', getFotos);                 // GET /fotos  o  /fotos?propiedadId=1
router.get('/:id', validarId(), getFoto);
router.post('/', verificarApiKey, upload.single('imagen'), validarTipo(fotoSchema), createFoto);
router.delete('/:id', verificarApiKey, validarId(), deleteFoto);

module.exports = router;