const { Router } = require('express');
const { upload } = require('../shared/upload.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { fotoSchema } = require('./foto.schema.js');
const { getFotos, getFoto, createFoto, deleteFoto } = require('./foto.controller.js');
const { verificarToken } = require('../middlewares/verificarToken.middleware.js');

const router = Router();

router.get('/', getFotos);                 // GET /fotos  o  /fotos?propiedadId=1
router.get('/:id', validarId(), getFoto);
router.post('/', verificarToken, upload.single('imagen'), validarTipo(fotoSchema), createFoto);
router.delete('/:id', verificarToken, validarId(), deleteFoto);

module.exports = router;