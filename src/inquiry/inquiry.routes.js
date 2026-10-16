const { Router } = require('express');
const { validateBody } = require('../middlewares/validateBody.middleware.js');
const { validateId } = require('../middlewares/validateId.middleware.js');
const { verifyToken } = require('../middlewares/verifyToken.middleware.js');
const {inquirySchema, inquiryUpdateSchema} = require('./inquiry.schema.js');
const {
    getInquiry,
    getInquiries,
    createInquiry,
    updateInquiry,
    deleteInquiry
} = require('./inquiry.controller.js');

const router = Router();

router.get('/', verifyToken, getInquiries);
router.get('/:id', verifyToken, validateId(), getInquiry);
router.post('/', validateBody(inquirySchema), createInquiry);
router.patch(
  '/:id',
  verifyToken,
  validateId(),
  validateBody(inquiryUpdateSchema),
  updateInquiry
);
router.delete('/:id', verifyToken, validateId(), deleteInquiry);
module.exports = router;