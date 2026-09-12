const { Router } = require('express');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
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
router.get('/:id', getZona);
router.post('/', validarTipo(zonaSchema), createZona);
router.patch('/:id', validarTipo(zonaUpdateSchema), updateZona);
router.delete('/:id', deleteZona);

module.exports = router;