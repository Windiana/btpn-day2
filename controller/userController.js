var models = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
    all : function (req , res) {
        models.User.findAll()
            .then(function(users){
                res.status(200).json(users);
            })
            .catch(function(err){
                res.status(400).json({status: err})
            })
    },
    addUserBook : function (req , res) {
        models.User.findOne({
            where: {
                id: req.params.userId
            }
        }).then(function (user) {
            models.UserBook.create({
                bookId: req.body.bookId,
                userId: user.id,
            }).then(function (user2) {
                res.status(201).json({data: user2});
            })
        }).catch(function (err) {
            res.status(400).json({status: err})
        });
    },

    getUserBook : function (req , res) {
        models.User.findByPk(req.params.userId, {
            include: [
                {
                    model: models.Book,
                    attributes: ["title", "price","page"],
                    through: { attributes: [] },
                },
            ],
        }) .then(function(users){
            res.status(200).json(users);
        })
            .catch(function(err){
            res.status(400).json({status : err})
            });
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
        var password = req.body.password;
        bcrypt.hash(password, saltRounds, function (err, hashPassword) {
            models.User.create({
                name: req.body.name,
                birthDay: req.body.birthDay,
                email: req.body.email,
                balance: req.body.balance,
                address: req.body.address,
                password: hashPassword
            })
                .then(function(users){
                    res.status(201).json({
                        status : "register successfully",
                        data : [
                            users.name,
                            users.email,
                            users.address,
                            users.birthDay,
                            users.balance
                        ]
                    });
                })
                .catch(function(err){
                   res.status(400).json(err)
                })
        })
    },
    login : function (req , res) {
        var password = req.body.password;

        models.User.findOne({
            where : {
                name : req.body.name,
            }
        }).then(function(user){
            if(user){
                bcrypt.compare( password, user.password, function (err, result) {
                   if(result){
                       var token = jwt.sign({
                           id : user.id,
                           email : user.email
                       }, "asd")
                   }
                   res.status(200).json({
                       token : token
                   })
                });
            }
        })
    }
};