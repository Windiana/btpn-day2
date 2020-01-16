var express = require('express');
var router = express.Router();

var userController = require("../controller/userController")

// GET Function | findAll
router.get('/', function(req, res, next) {
  userController.getAllUsers(req, res)
})

// GET Function | findOne
router.get('/:id', function (req, res) {
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
