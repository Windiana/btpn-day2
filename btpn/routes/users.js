var express = require('express');
var router = express.Router();

var userController = require('../controller/userController')

router.get('/', function(req, res, next) {
  userController.list(res)
});

router.post('/', function(req, res, next) {
  userController.add(req, res)
});

router.delete('/:id', function(req, res, next) {
  userController.hapus(req, res)
});

router.put('/:id', function(req, res, next) {
  userController.update(req, res)
});

router.post('/regis', function(req, res, next) {
  userController.regis(req, res)
});

router.post('/login', function(req, res, next) {
  userController.login(req, res)
});

module.exports = router;