var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var userController = require("../controller/userController")

async function checkAuth(req,res,next){
  try{
    userToken = req.headers.authorization
    jwt.verify(userToken,process.env.SECRET_TOKEN,(err,result)=>{
      if(err){
        res.status(400).json({
          message: ("Invalid Token")
        })
      }
    })
  }catch (err) {
    return next(err)
  }
  next()
}

// GET Function | findAll
router.get('/',checkAuth, function(req, res, next) {
  userController.getAllUsers(req, res)
})

router.get('/tanpaToken', function (req, res) {
  userController.getAllUsers(req,res)
})


// GET Function | findOne
router.get('/:id',checkAuth, function (req, res) {
  userController.getUser(req,res)
})

// POST Function | create
router.post('/', function (req,res) {
  userController.addUser(req,res)
})

// PUT Function | update
router.put('/:id', function (req, res) {
  userController.updateUser(req,res)
})

// DELETE Function | destroy
router.delete('/:id',function (req,res) {
  userController.deleteUser(req, res)
})

router.post('/register',function (req,res) {
  userController.register(req,res)
})

router.post('/login', function (req, res) {
  userController.login(req,res)
})



module.exports = router;
