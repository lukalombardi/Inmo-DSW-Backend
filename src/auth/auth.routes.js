const { Router } = require('express');
const { validarUsuario } = require('../middlewares/validarUsuario.middleware.js');
const {loginSchema} = require('./auth.schema.js');
const {login} = require('./auth.controller.js');

const router = Router();


router.post('/login', validarUsuario(loginSchema), login);


module.exports = router;