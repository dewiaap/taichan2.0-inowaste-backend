var express = require('express');
var router = express.Router();
const controller = require('../controllers/transaksi.controller');

router.get('/', controller.getAllTransaksi);
router.get('/:column/:value', controller.getTransaksiByCol);
router.post('/', controller.addTransaksi);
router.post('/status', controller.addStatusTransaksi);
router.put('/:id_transaksi', controller.updateTransaksi);
router.delete('/:id_transaksi', controller.deleteTransaksi);

module.exports = router
