var models = require('../models')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
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
      balance : req.body.balance,
      address : req.body.address,
      password : req.body.password
    })
      .then(function (user) {
        res.status(200).json({
          status: 'ok',
          data:user
        })
      }).catch(function (err) {
      res.status(400).json({
        status: (err.message)
      })
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
  },
  regis: (req,res) =>{
    let data = req.body;
    let password = bcrypt.hashSync(data.password, salt);
    models['Users'].create({
      email : data.email,
      name : data.birthdate,
      birthdate : data.birthdate,
      address : data.address,
      password : password,
    }).then(function (user) {
      res.status(200).json({
        status: 'ok',
        data:user
      })
    }).catch(function (err) {
      res.status(400).json({
        status: (err.message)
      })
    })
  },
  login:(req,res) =>{
    let data = req.body;
    models['Users'].findOne({
      where:{
        email : data.email
      }
    })
      .then(function (user) {
        if(user){
          let result =bcrypt.compare(data.password,user.password);
          if (result){
            var token = jwt.sign({
              id: user.id, email: user.email
            },process.env.TOKEN)
          }
          res.status(200).json({
            token:token,
            message : "anda sudah login"
          })
        }
      })
  }
}