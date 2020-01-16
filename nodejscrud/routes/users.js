// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource karim');
// });
//
// module.exports = router;

var express = require('express')
var router = express.Router()

var userController = require("../controller/userController")

router.get('/',function (req,res){
  userController.list(req, res)
})

router.get('/categories',function (req,res) {
  userController.categories(req,res)
})

router.post('/',function(req, res){
  userController.add(req,res)
})

router.put('/:id', function (req, res) {
  userController.update(req,res)

})

router.delete('/:id', function (req, res) {
  userController.delete(req,res)

})
module.exports=router
