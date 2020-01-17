var express = require('express');
var router = express.Router();

var bookController = require('../controller/bookController.js');

router.get('/', function(req , res){
    bookController.all(req , res);
});

router.post('/', function(req , res){
    bookController.add(req ,res );
});

router.put('/', function(req ,res ){
   book.Controller.update(req ,res);
});

router.delete('/', function(req ,res ){
    book.Controller.delete(req ,res);
});

module.exports = router;