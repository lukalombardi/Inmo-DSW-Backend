const { Router } = require('express');
const { validarPropiedad } = require('../middlewares/validarPropiedad.middleware.js');
const { verificarApiKey } = require('../middlewares/apiKey.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const { propiedadSchema, propiedadUpdateSchema } = require('./propiedad.schema.js');
const {
    getPropiedades,
    getPropiedad,
    createPropiedad,
    updatePropiedad,
    deletePropiedad
} = require('./propiedad.controller.js');

const router = Router();

router.get('/', getPropiedades);
router.get('/:id', validarId(), getPropiedad);
router.post('/', verificarApiKey, validarPropiedad(propiedadSchema), createPropiedad);
router.patch(
    '/:id',
    verificarApiKey,
    validarId(),
    validarPropiedad(propiedadUpdateSchema),
    updatePropiedad
);
router.delete('/:id', verificarApiKey, validarId(), deletePropiedad);

module.exports = router;
