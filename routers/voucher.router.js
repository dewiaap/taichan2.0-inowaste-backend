var express = require('express');
var router = express.Router();
const controller = require('../controllers/voucher.controller');

router.get('/', controller.getAllVoucher);
router.get('/:column/:value', controller.getVoucherByCol);
router.post('/', controller.addVoucher);
router.put('/:id_voucher', controller.updateVoucher);
router.delete('/:id_voucher', controller.deleteVoucher);

module.exports = router
