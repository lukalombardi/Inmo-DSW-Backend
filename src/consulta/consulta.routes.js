const { Router } = require('express');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const { verificarToken } = require('../middlewares/verificarToken.middleware.js');
const {consultaSchema, consultaUpdateSchema} = require('../consulta/consulta.schema.js');
const {
    getConsulta,
    getConsultas,
    createConsulta,
    updateConsulta,
    deleteConsulta
} = require('./consulta.controller.js');

const router = Router();

router.get('/', verificarToken, getConsultas);
router.get('/:id', verificarToken, validarId(), getConsulta);
router.post('/', validarTipo(consultaSchema), createConsulta);
router.patch(
  '/:id',
  verificarToken,
  validarId(),
  validarTipo(consultaUpdateSchema),
  updateConsulta
);
router.delete('/:id', verificarToken, validarId(), deleteConsulta);
module.exports = router;