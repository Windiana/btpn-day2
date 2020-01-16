var models = require('../models');
var jwt = require('express-jwt');
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    all : function (req , res) {
        models.User.findAll()
            .then(function(users){
                res.status(200).json(users);
            })
            .catch(function(err){

            })
    },
    add : function (req ,res ){
        models.User.create({
            name : req.body.firstName,
            birthDay: req.body.lastName,
            email : req.body.email,
            balance : req.body.balance,
            address : req.body.address,
        }).then(function(users){
            res.status(201).json({
                status: 'created',
                data : users
            });
        }).catch(function(err){
            res.status(200).json({
                status: err
            })
        })
    },
    //CREATE
    update : function (req , res){
        models.User.update({
            name : req.body.firstName,
            birthDay: req.body.lastName,
            email : req.body.email,
            balance : req.body.balance
        },{
            where: {
                id : req.params.id
            }
        }).then(function(user){
            res.status(201).json({
                status: 'updated',
                data : user
            });
        }).catch(function(err){

        })
    },
    delete : function(req ,res){
        models.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(user){
            res.status(201).json({
                status: 'deleted',
                data : user
            });
        }).catch(function(err){

        })
    },
    regis : function( req , res ) {
        var{email , name , birthDay, password } = req.body;
        bcrypt.hash(req.body.password, saltRounds, function (err, hashPassword) {
            models.User.create({
                name: req.body.firstName,
                birthDay: req.body.lastName,
                email: req.body.email,
                balance: req.body.balance,
                address: req.body.address,
                password: hashPassword
            })
                .then(function(users){
                    res.status(201).json(users);
                })
                .catch(function(err){
                   res.status(400).json(err)
                })
        })
    },
    login : function (req , res) {
        models.User.findOne({
            where : {
                name : req.body.name,
            }
        }).then(function(user){
            if(user){
                bcrypt.compare(password, user.password, function (err, result) {
                   if(result){
                       var token = jwt.sign({
                           id : user.id,
                           email : user.email
                       }, process.env.SECRET_TOKEN
                       )}
                   res.status(200).json({
                       token : token
                   })
                });
            }
        })
    }

};