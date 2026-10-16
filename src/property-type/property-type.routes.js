const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const { validateId } = require('../middlewares/validateId.middleware.js');
const { propertyTypeSchema, propertyTypeUpdateSchema } = require('./property-type.schema.js');
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');
const { requireAdmin } = require('../middlewares/requireAdmin.middleware.js');
const {
  getPropertyTypes,
  getPropertyType,
  createPropertyType,
  updatePropertyType,
  deletePropertyType
} = require('./property-type.controller.js');

const router = Router();

router.get('/', getPropertyTypes);
router.get('/:id', validateId(), getPropertyType);
router.post('/', verifyToken, requireAdmin, validateBody(propertyTypeSchema), createPropertyType);
router.patch(
  '/:id',
  verifyToken, 
  requireAdmin,
  validateId(),
  validateBody(propertyTypeUpdateSchema),
  updatePropertyType
);
router.delete('/:id', verifyToken, requireAdmin, validateId(), deletePropertyType);

module.exports = router;
