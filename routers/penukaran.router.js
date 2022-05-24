var express = require('express');
var router = express.Router();
const controller = require('../controllers/penukaran.controller');

router.get('/', controller.getAllPenukaran);
router.get('/:column/:value', controller.getPenukaranByCol);
router.post('/', controller.addPenukaran);
router.put('/:id_penukaran', controller.updatePenukaran);
router.delete('/:id_penukaran', controller.deletePenukaran);

module.exports = router
