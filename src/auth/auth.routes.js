const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const {loginSchema} = require('./auth.schema.js');
const {login} = require('./auth.controller.js');

const router = Router();


router.post('/login', validateBody(loginSchema), login);


module.exports = router;