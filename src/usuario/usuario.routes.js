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
const { verificarToken } = require('../middlewares/verificarToken.middleware.js');
const { soloAdmin } = require('../middlewares/soloAdmin.middleware.js');

const router = Router();

router.get('/', verificarToken, soloAdmin, getUsuarios);
router.get('/:id', verificarToken, soloAdmin, validarId(),getUsuario)
router.post('/', verificarApiKey, validarUsuario(usuarioSchema),createUsuario);
router.patch('/:id',verificarToken, soloAdmin, validarId(),validarUsuario(usuarioUpdateSchema),updateUsuario);
router.delete('/:id',verificarToken, soloAdmin, validarId(), deleteUsuario);

module.exports = router;