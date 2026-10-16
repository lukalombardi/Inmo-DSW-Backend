const { Router } = require('express');
const { upload } = require('../shared/upload.js');
const { validateId } = require('../middlewares/validateId.middleware.js');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const { photoSchema } = require('./photo.schema.js');
const { getPhotos, getPhoto, createPhoto, deletePhoto } = require('./photo.controller.js');
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');

const router = Router();

router.get('/', getPhotos);                 
router.get('/:id', validateId(), getPhoto);
router.post('/', verifyToken, upload.single('image'), validateBody(photoSchema), createPhoto);
router.delete('/:id', verifyToken, validateId(), deletePhoto);

module.exports = router;