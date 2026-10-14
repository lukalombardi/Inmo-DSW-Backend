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
const { verificarToken } = require('../middlewares/verificarToken.middleware.js');

router.get('/', getPropiedades);
router.get('/:id', validarId(), getPropiedad);
router.post('/', verificarToken, validarPropiedad(propiedadSchema), createPropiedad);
router.patch(
    '/:id',
    verificarToken,
    validarId(),
    validarPropiedad(propiedadUpdateSchema),
    updatePropiedad
);
router.delete('/:id',verificarToken , validarId(), deletePropiedad);

module.exports = router;
