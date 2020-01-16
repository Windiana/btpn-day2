var express = require('express')
var router = express.Router()

var transaksiController = require("../controller/transaksiController")

router.get('/',function (req,res){
    transaksiController.list(req, res)
})

router.get('/categories',function (req,res) {
    transaksiController.categories(req,res)
})

router.post('/',function(req, res){
    transaksiController.add(req,res)
})

router.put('/:id', function (req, res) {
    transaksiController.update(req,res)

})

router.delete('/:id', function (req, res) {
    transaksiController.delete(req,res)

})
module.exports=router