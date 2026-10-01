const { Router } = require('express');
const { validarTipo } = require('../middlewares/validarTipo.middleware.js');
const { verificarApiKey } = require('../middlewares/apiKey.middleware.js');
const { validarId } = require('../middlewares/validarId.middleware.js');
const {usuarioSchema, usuarioUpdateSchema} = require('./usuario.schema.js');
const {
//    getUsuario,
    getUsuarios,
//    createUsuario,
//    deleteUsuario,
//    updateUsuario
} = require('./usuario.controller.js');

const router = Router();

router.get('/', getUsuarios);
//router.get('/:id', validarId(),getUsuario);
//router.post('/', validarTipo(usuarioSchema),createUsuario);
//router.patch('/:id', validarId(),validarTipo(usuarioUpdateSchema),updateUsuario);
//router.delete('/:id', validarId(), deleteUsuario);

module.exports = router;