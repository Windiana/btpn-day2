var express = require('express');
var router = express.Router();

/* GET users listing. */
var userController = require('../controller/userController.js');

router.get('/', function( req , res){
  userController.all(req , res);
});

router.post('/', function(req ,res){
  userController.add(req ,res)
});

router.put('/:id', function(req ,res){
  userController.update(req ,res)
});

router.delete('/:id', function(req ,res){
  userController.delete(req ,res)
});

router.post('/register', function(req , res){
  userController.regis(req ,res)
});

router.post('/login', function(req , res ){
  userController.login(req , res)
});

module.exports = router;