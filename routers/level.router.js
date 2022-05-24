var express = require('express');
var router = express.Router();
const controller = require('../controllers/level.controller');

router.get('/', controller.getAllLevel);

module.exports = router
