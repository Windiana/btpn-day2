var express = require('express');
var router = express.Router();

var productController = require('../controller/productController')

router.get('/', function(req, res, next) {
  productController.list(res)
});

router.post('/', function(req, res, next) {
  productController.add(req, res)
});

router.delete('/:id', function(req, res, next) {
  productController.hapus(req, res)
});

router.put('/:id', function(req, res, next) {
  productController.update(req, res)
});

module.exports = router;