var models = require("../models")
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

module.exports = {
    getAllUsers:function (req, res) {
        models.User.findAll()
            .then(function (users) {
                res.status(200).json(users)
            }).catch(function (err) {

        })
    },
    getUser:function (req, res) {
        models.User.findOne({
        where:{id:req.params.id}
        }).then(function (user) {
            res.status(200).json({
                status:"OK!",
                data: user
            })
        }).catch(function (err) {

        })
     },
    addUser:function (req,res) {
        models.User.create({
            email : req.body.email,
            name: req.body.name,
            birthdate: req.body.birthdate,
            balance: req.body.balance
        })
            .then(function (user) {
                res.status(201).json({
                    status:"Created!",
                    data: user
                })
            })
            .catch(function (err) {
                res.status(400).json({
                    status:err.message
                })
            })
    },
    updateUser:function (req,res) {
        models.User.update({
            email : req.body.email,
            name: req.body.name,
            birthdate: req.body.birthdate,
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
                res.status(400).json({
                    status:err.message
                })
            })
    },
    deleteUser: function (req, res) {
        models.User.destroy({
            where: {id: req.params.id}
        })
            .then(function (user) {
                res.status(200).json({
                    status:"Delete Success !",
                    data: user
                })
            })
    },
    register: (req,res) => {
        var{email,name,birthdate,password} = req.body

        bcrypt.hash(password, saltRounds, function(err, hashPassword) {
            // Store hash in your password DB.
            models.User.create({
                email,
                name,
                birthdate,
                password: hashPassword
            })
                .then(function (user) {
                    //
                    res.status(201).json(user)
                })
                .catch(function (err) {
                    res.status(400).json({
                        status:err.message
                    })
                })
        });
    },
    login:(req, res) => {
        var{email, password} = req.body

        models.User.findOne({
            where:{
                email:email
            }
        })
            .then(user =>{
                if(user){
                    // dapetin dari plain password yang di hash
                    // dapetin dari database, password yang sudah di hash sebelumnya
                    bcrypt.compare(password, user.password,function (err, result) {
                        if(result){
                            // geterate token by JWT
                            var token = jwt.sign({
                                id:user.id,
                                email:user.email
                            },process.env.SECRET_TOKEN);
                            res.status(200).json({
                                token: token
                            })
                        }
                    })
                }
            })
    }

}