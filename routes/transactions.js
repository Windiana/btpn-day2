var express = require('express');
var router = express.Router();

var transactionController = require('../controller/transactionController.js');

router.get('/', function( req , res){
    transactionController.all(req , res);
});

router.post('/', function(req ,res){
    transactionController.add(req ,res)
});

router.put('/:id', function(req ,res){
    transactionController.update(req ,res)
});

router.delete('/:id', function(req ,res){
    transactionController.delete(req ,res)
});

module.exports = router;