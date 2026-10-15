const { Router } = require('express');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const { zonaSchema, zonaUpdateSchema } = require('./zona.schema.js');
const { verificarToken } = require('../middlewares/verificarToken.middleware.js');
const { soloAdmin } = require('../middlewares/soloAdmin.middleware.js');
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
router.post('/', verificarToken, soloAdmin, validarTipo(zonaSchema), createZona);
router.patch(
  '/:id',
  verificarToken, 
  soloAdmin,
  validarId(),
  validarTipo(zonaUpdateSchema),
  updateZona
);
router.delete('/:id', verificarToken, soloAdmin, validarId(), deleteZona);

module.exports = router;