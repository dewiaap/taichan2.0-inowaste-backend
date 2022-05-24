var express = require('express');
var router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getAllUser);
router.get('/:column/:value', controller.getUserByCol);
router.post('/', controller.addUser);
router.post('/login', controller.login);
router.put('/:id_user', controller.updateUser);
router.delete('/:id_user', controller.deleteUser);

module.exports = router
