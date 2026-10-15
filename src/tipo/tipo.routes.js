const { Router } = require('express');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const { tipoSchema, tipoUpdateSchema } = require('./tipo.schema.js');
const { verificarToken } = require('../middlewares/verificarToken.middleware.js');
const { soloAdmin } = require('../middlewares/soloAdmin.middleware.js');
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
router.post('/', verificarToken, soloAdmin, validarTipo(tipoSchema), createTipo);
router.patch(
  '/:id',
  verificarToken, 
  soloAdmin,
  validarId(),
  validarTipo(tipoUpdateSchema),
  updateTipo
);
router.delete('/:id', verificarToken, soloAdmin, validarId(), deleteTipo);

module.exports = router;
