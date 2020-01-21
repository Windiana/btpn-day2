var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController')

router.get('/', function (req, res, next) {
  productController.list(req, res)
})

router.get('/productCategories', function (req, res, next) {
  productController.listCategory(req, res)
})

module.exports = router