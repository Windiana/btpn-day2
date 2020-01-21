var express = require('express');
var router = express.Router();

var transactionController = require('../controllers/transactionController')

router.get('/', function (req, res, next) {
  console.log("=====================err")
  transactionController.getlist(res)
});

router.post('/', function (req, res, next) {
  transactionController.add(req, res)
});

router.delete('/:id', function (req, res, next) {
  transactionController.delete(req, res)
});

router.put('/:id', function (req, res, next) {
  transactionController.update(req, res)
});

module.exports = router;