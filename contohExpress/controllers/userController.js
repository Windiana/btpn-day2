var models = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')



module.exports = {
  list: function (res) {
    models.User.findAll()
      .then(function (users) {
        res.status(200).json(users)
      }).catch(function (err) {
    })
  },

  add: function (req, res) {
    models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      balance: req.body.balance
    })
    .then(function (user) {
       res.status(200).json({
         status: "Ok",
         data: user
       })
    })
    .catch(function (err) {
      res.status(400).json({
        status: (err.message)
      })
    })
  },

  delete: function (req, res) {
    models.User.destroy({
      where:{
        id: req.params.id
      }
    }).then(function (user) {
      res.status(200).json({
        status: "Ok",
        data: user
      })
    })
      .catch(function (err) {
        console.log('======== err', err)
      })

  },

  update: function (req, res) {
    models.User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      balance: req.body.balance},
      {where: {
        id: req.params.id
      }
    })
      .then(function (user) {
        res.status(200).json({
          status: "ok",
          data: user
        })

      })
      .catch(function (err) {
        res.status(400).json({
          status: (err.message)
        })
      })
  },
  register: function(req,res){
    var password = req.body.password
    bcrypt.hash(password, saltRounds, function (err, hashPassword) {
      if (!err) {
        models.User.create({
          firstName: req.body.firstName,
          lastname: req.body.lastName,
          address: req.body.address,
          email: req.body.email,
          balance: req.body.balance,
          address: req.body.address,
          password: hashPassword
        })
          .then(function (user) {
            res.status(200).json(user)

          })
          .catch(function (err) {
            res.status(400).json({
              status: 'Error',
              message: err.message
            })

          })
      }
    })
  },
  login: function(req, res){
    models.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function (user) {
        if(user){
        password = req.body.password
        bcrypt.compare(password, user.password, function (err, result) {
          if(result){
            var token = jwt.sign({
              id: user.id,
              email: user.email
            }, process.env.SECRET);
            res.status(200).json({
              token:token
            })
          }

          res.status(400).json({
            status: 'error',
            message: 'Token Tidak Ditemukan'
          })
        })

      }
    })
  }
}
