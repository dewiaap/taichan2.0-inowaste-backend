var express = require('express');
var router = express.Router();
const controller = require('../controllers/galeri.controller');

router.get('/', controller.getAllGaleri);
router.get('/:column/:value', controller.getGaleriByCol);
router.post('/', controller.addGaleri);
router.put('/:id_galeri', controller.updateGaleri);
router.delete('/:id_galeri', controller.deleteGaleri);

module.exports = router
