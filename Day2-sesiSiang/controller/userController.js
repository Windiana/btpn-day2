var models = require("../models")

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
        where:{
            id:req.params.id
        }
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
    }

}