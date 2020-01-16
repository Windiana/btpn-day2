var models = require('../models')
module.exports = {
  list: function (res) {
    models.Users.findAll()
      .then(function (users) {
        res.status(200).json(users)
      })
      .catch(function (err) {
      })
  },
  add:function (req,res) {
    models.Users.create({
      email : req.body.email,
      name : req.body.name,
      birthdate : req.body.birthdate,
      balance : req.body.balance
    })
      .then(function (user) {
        res.status(200).json({
          status: 'ok',
          data:user
        })
      }).catch(function (err) {
    })
  },
  hapus: function (req, res) {
    models.Users.destroy({
      where:{
        id: req.params.id
      }
    }).then(function (user) {
      res.status(200).json({
        status: 'ok'
      })
    })
  },
  update: function (req, res) {
    console.log(req.body)

    console.log(req.params.id)
    models.Users.update({
      email : req.body.email,
      name : req.body.name,
      birthdate : req.body.birthdate,
      balance : req.body.balance
    },{
      where:{
        id: req.params.id
      }
    }).then(function (user) {
      res.status(200).json({
        status:'ok',
        data:user
      })
    })
  }
}