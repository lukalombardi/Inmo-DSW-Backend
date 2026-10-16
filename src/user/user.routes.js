const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const { verifyApiKey } = require('../middlewares/apiKey.middleware.js');
const { validateId } = require('../middlewares/validateId.middleware.js');
const {userSchema, userUpdateSchema} = require('./user.schema.js');
const {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser
} = require('./user.controller.js');
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');
const { requireAdmin } = require('../middlewares/requireAdmin.middleware.js');

const router = Router();

router.get('/', verifyToken, requireAdmin, getUsers);
router.get('/:id', verifyToken, requireAdmin, validateId(),getUser)
router.post('/', verifyApiKey, validateBody(userSchema),createUser);
router.patch('/:id',verifyToken, requireAdmin, validateId(),validateBody(userUpdateSchema),updateUser);
router.delete('/:id',verifyToken, requireAdmin, validateId(), deleteUser);

module.exports = router;