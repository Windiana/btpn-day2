var models = require("../models")

module.exports = {
    getAllTransactions:function (req, res) {
        models.Transactions.findAll()
            .then(function (transaction) {
                res.status(200).json(transaction)
            }).catch(function (err) {

        })
    },
    getTransaction:function (req, res) {
        models.Transactions.findOne({
            where:{
                id:req.params.id
            }
        }).then(function (user) {
            res.status(200).json({
                status:"OK!",
                data: user
            })
        })
    },
    addTransaction:function (req,res) {
        models.Transactions.create({
            date : req.body.date,
            description: req.body.description,
            notes: req.body.notes.toUpperCase(),
            balance: req.body.balance
        })
            .then(function (user) {
                res.status(201).json({
                    status:"Created!",
                    data: user
                })
            })
            .catch(function (err) {

            })
    },
    updateTransaction:function (req,res) {
        models.Transactions.update({
            date : req.body.date,
            description: req.body.description,
            notes: req.body.notes.toUpperCase(),
            balance: req.body.balance
        },{
            where:{id:req.params.id}
        })
            .then(function (user) {
                res.status(200).json({
                    status:"OK!",
                    data: user
                })
            })
            .catch(function (err) {

            })
    },
    deleteTransaction: function (req, res) {
        models.Transactions.destroy({
            where: {id: req.params.id}
        })
            .then(function (user) {
                res.status(200).json({
                    status:"Delete Success !",
                    data: user
                })
            })
    }

}