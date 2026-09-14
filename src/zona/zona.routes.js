const { Router } = require('express');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const { verificarApiKey } = require('../middlewares/apiKey.middleware.js');
const { zonaSchema, zonaUpdateSchema } = require('./zona.schema.js');
const {
  getZonas,
  getZona,
  createZona,
  updateZona,
  deleteZona
} = require('./zona.controller.js');

const router = Router();

router.get('/', getZonas);
router.get('/:id', validarId(), getZona);
router.post('/', verificarApiKey, validarTipo(zonaSchema), createZona);
router.patch(
  '/:id',
  verificarApiKey,
  validarId(),
  validarTipo(zonaUpdateSchema),
  updateZona
);
router.delete('/:id', verificarApiKey, validarId(), deleteZona);

module.exports = router;