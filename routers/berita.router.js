var express = require('express');
var router = express.Router();
const controller = require('../controllers/berita.controller');

router.get('/', controller.getAllBerita);
router.get('/:column/:value', controller.getBeritaByCol);
router.post('/', controller.addBerita);
router.put('/:id_berita', controller.updateBerita);
router.delete('/:id_berita', controller.deleteBerita);

module.exports = router
