const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const {loginSchema, registerSchema} = require('./auth.schema.js');
const {login, register} = require('./auth.controller.js');

const router = Router();


router.post('/login', validateBody(loginSchema), login);
router.post('/register', validateBody(registerSchema), register);


module.exports = router;