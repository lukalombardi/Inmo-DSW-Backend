const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const { validateId } = require('../middlewares/validateId.middleware.js');
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');
const { requireStaff } = require('../middlewares/requireStaff.middleware.js');
const {inquirySchema, inquiryUpdateSchema} = require('./inquiry.schema.js');
const {
    getInquiry,
    getInquiries,
    createInquiry,
    updateInquiry,
    deleteInquiry
} = require('./inquiry.controller.js');

const router = Router();

router.get('/', verifyToken, requireStaff, getInquiries);
router.get('/:id', verifyToken, requireStaff, validateId(), getInquiry);
router.post('/', validateBody(inquirySchema), createInquiry);
router.patch(
  '/:id',
  verifyToken,
  requireStaff,
  validateId(),
  validateBody(inquiryUpdateSchema),
  updateInquiry
);
router.delete('/:id', verifyToken, requireStaff, validateId(), deleteInquiry);
module.exports = router;