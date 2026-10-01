const { Router } = require('express');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { verificarApiKey } = require('../middlewares/apiKey.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const {consultaSchema, consultaUpdateSchema} = require('../consulta/consulta.schema.js');
const {
    getConsulta,
    getConsultas,
    createConsulta,
    updateConsulta,
    deleteConsulta
} = require('./consulta.controller.js');

const router = Router();

router.get('/', getConsultas);
router.get('/:id', validarId(), getConsulta);
router.post('/', verificarApiKey, validarTipo(consultaSchema), createConsulta);
router.patch(
  '/:id',
  //verificarApiKey,
  validarId(),
  validarTipo(consultaUpdateSchema),
  updateConsulta
);
// router.delete('/:id', verificarApiKey, validarId(), deleteTipo);
router.delete('/:id', validarId(), deleteConsulta);
module.exports = router;