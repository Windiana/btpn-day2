var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET users listing. */
var userController = require('../controller/userController.js');

async function checkToken(req , res ,next ){
  try {
    userToken = req.headers.authorization;
    jwt.verify(userToken , "asd",(err,result) =>{
      if(err){
        throw new Error("INVALID TOKEN");
      }
      return next();
    })
  } catch (err) {
    next(err)
  }
}

router.get('/:userId/book', checkToken, function( req , res){
  userController.getUserBook(req , res);
});

router.post('/:userId/book', function( req , res){
  userController.addUserBook(req , res);
});

router.get('/',  checkToken, function (req , res){
  userController.all(req , res);
});

router.get('/:id/book', function( req , res){
  userController.getUserBook(req , res);
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