var express= require('express')
var router = express.Router()

var transactionController = require("../controller/transactionController")

// GET Function | findAll
router.get('/', function(req, res, next) {
    transactionController.getAllTransactions(req, res)
})

// GET Function | findOne
router.get('/:id', function (req, res) {
    transactionController.getTransaction(req,res)
})

// POST Function | create
router.post('/', function (req,res) {
    transactionController.addTransaction(req,res)
})

// PUT Function | update
router.put('/:id', function (req, res) {
    transactionController.updateTransaction(req,res)
})

// DELETE Function | destroy
router.delete('/:id',function (req,res) {
    transactionController.deleteTransaction(req, res)
})

module.exports= router;