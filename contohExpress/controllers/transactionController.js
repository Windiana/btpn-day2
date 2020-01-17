//TASK 6 dan 8
var models = require('../models')
module.exports = {
  getlist: function (res) {
    models.Transactions.findAll()
      .then(function (transactions) {
        res.status(200).json(transactions)
      })
      .catch(function (err) {
        res.status(400).json({
          status: (err.message)
        })
      })
  },

  add:function (req,res) {
    models.Transactions.create({
      date : req.body.date,
      description : req.body.description,
      notes : req.body.notes,
      balance : req.body.balance,
      amount: req.body.amount
    })
      .then(function (transaction) {
        res.status(200).json({
          status: 'ok',
          data:transaction
        })
      })
      .catch(function (err) {
      res.status(400).json({
        status: (err.message)
      })
    })
  },

  delete: function (req, res) {
    models.Transactions.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(function (transaction) {
      res.status(200).json({
        status: 'ok',
        data: transaction
      })
    })
  },

  update: function (req, res) {
    console.log(req.body)

    console.log(req.params.id)
    models.Transactions.update({
      date : req.body.date,
      description : req.body.description,
      notes : req.body.notes,
      balance : req.body.balance,
      amount: req.body.amount
    },
      {
      where:{
        id: req.params.id
      }
    })
      .then(function (transactions) {
      res.status(200).json({
        status:'ok',
        data:transactions
      })
    })
      .catch(function (err) {
        res.status(400).json({
          status: (err.message)
        })
      })
  }
}