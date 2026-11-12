const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const { validateId } = require('../middlewares/validateId.middleware.js');
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');
const { likeSchema } = require('./like.schema.js');
const { createLike, deleteLike, getMyLikes } = require('./like.controller.js');

const router = Router();

// Cualquier usuario logueado puede dar like (sin restriccion de rol)
router.post('/properties/:id/likes', verifyToken, validateId(), validateBody(likeSchema), createLike);
router.delete('/properties/:id/likes', verifyToken, validateId(), deleteLike);
router.get('/likes/mine', verifyToken, getMyLikes);

module.exports = router;
