const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const { validateId } = require('../middlewares/validateId.middleware.js');
const { propertySchema, propertyUpdateSchema } = require('./property.schema.js');
const {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty
} = require('./property.controller.js');

const router = Router();
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');
const { requireStaff } = require('../middlewares/requireStaff.middleware.js');

router.get('/', getProperties);
router.get('/:id', validateId(), getProperty);
router.post('/', verifyToken, requireStaff, validateBody(propertySchema), createProperty);
router.patch(
    '/:id',
    verifyToken,
    requireStaff,
    validateId(),
    validateBody(propertyUpdateSchema),
    updateProperty
);
router.delete('/:id',verifyToken , requireStaff, validateId(), deleteProperty);

module.exports = router;
