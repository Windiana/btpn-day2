
var express = require('express')
var router = express.Router()

var brandsController = require("../controller/brandsController")

router.get('/',function (req,res){
    brandsController.list(req, res)
})

router.get('/categories',function (req,res) {
    brandsController.categories(req,res)
})

router.post('/',function(req, res){
    brandsController.add(req,res)
})

router.put('/:id', function (req, res) {
    brandsController.update(req,res)

})

router.delete('/:id', function (req, res) {
    brandsController.delete(req,res)

})
module.exports=router
