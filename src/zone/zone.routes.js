const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const { validateId } = require('../middlewares/validateId.middleware.js');
const { zoneSchema, zoneUpdateSchema } = require('./zone.schema.js');
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');
const { requireAdmin } = require('../middlewares/requireAdmin.middleware.js');
const {
  getZones,
  getZone,
  createZone,
  updateZone,
  deleteZone
} = require('./zone.controller.js');

const router = Router();

router.get('/', getZones);
router.get('/:id', validateId(), getZone);
router.post('/', verifyToken, requireAdmin, validateBody(zoneSchema), createZone);
router.patch(
  '/:id',
  verifyToken, 
  requireAdmin,
  validateId(),
  validateBody(zoneUpdateSchema),
  updateZone
);
router.delete('/:id', verifyToken, requireAdmin, validateId(), deleteZone);

module.exports = router;