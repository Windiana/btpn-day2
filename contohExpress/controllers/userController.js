const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const {Transactions, User} = require('../models')

module.exports = {
  list: function (res, next) {
    User.findAll()
      .then(function (users) {
        res.status(200).json(users)
      })
      .catch(function (err) {
        res.status(400).json(err)
      })
  },

  add: function (req, res) {
    User.create({
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
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (user) {
        res.status(200).json({
          status: "Ok",
          data: user
        })
      })
      .catch(function (err) {
        console.log(err)
      })
  },

  update: function (req, res) {
    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        balance: req.body.balance
      },
      {
        where: {
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

  register: function (req, res) {
    var password = req.body.password
    bcrypt.hash(password, saltRounds, function (err, hashPassword) {
      if (!err) {
        User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          email: req.body.email,
          balance: req.body.balance,
          address: req.body.address,
          password: hashPassword
        })
          .then(function (user) {
            res.status(200).json({
              status: "ok",
              data: [{
                'First Name': user.firstName,
                'Last Name': user.lastName,
                'Email': user.email,
                'Address': user.address
              }]
            })

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

  login: function (req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function (user) {
        if (user) {
          password = req.body.password
          bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
              var token = jwt.sign({
                id: user.id,
                email: user.email
              }, process.env.SECRET);
              res.status(200).json({
                token: token,
                message: "Anda Berhasil Masuk"
              })
            } else {
              res.status(400).json({
                status: 'Tidak Dapat Masuk',
                message: 'Email atau Password Salah'
              })
            }


          })

        }
      })
  },

  findTransactionByUser: function (req, res) {
    if (User) {
      User.findByPk(req.params.id, {
        include: [
          {
            model: Transactions,
            attributes: ["id", "amount"],
            //required: true,
            as: "transactions",
          },
        ],
      }).then(users => {
        res.json(users)
      });
    } else {
      res.status(400).json({
        status: 'Tidak Ditemukan',
        message: 'Id Salah'
      })
    }
  }
}
