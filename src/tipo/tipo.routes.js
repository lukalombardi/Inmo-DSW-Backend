const { Router } = require('express');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { verificarApiKey } = require('../middlewares/apiKey.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const { tipoSchema, tipoUpdateSchema } = require('./tipo.schema.js');
const {
  getTipos,
  getTipo,
  createTipo,
  updateTipo,
  deleteTipo
} = require('./tipo.controller.js');

const router = Router();

router.get('/', getTipos);
router.get('/:id', validarId(), getTipo);
router.post('/', verificarApiKey, validarTipo(tipoSchema), createTipo);
router.patch(
  '/:id',
  verificarApiKey,
  validarId(),
  validarTipo(tipoUpdateSchema),
  updateTipo
);
router.delete('/:id', verificarApiKey, validarId(), deleteTipo);

module.exports = router;
