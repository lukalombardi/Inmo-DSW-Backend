const { Router } = require('express');
const { validarUsuario } = require('../middlewares/validarUsuario.middleware.js');
const { verificarApiKey } = require('../middlewares/apiKey.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const {usuarioSchema, usuarioUpdateSchema} = require('./usuario.schema.js');
const {
    getUsuario,
    getUsuarios,
    createUsuario,
    deleteUsuario,
    updateUsuario
} = require('./usuario.controller.js');

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', validarId(),getUsuario);
router.post('/', verificarApiKey, validarUsuario(usuarioSchema),createUsuario);
router.patch('/:id',verificarApiKey, validarId(),validarUsuario(usuarioUpdateSchema),updateUsuario);
router.delete('/:id',verificarApiKey, validarId(), deleteUsuario);

module.exports = router;