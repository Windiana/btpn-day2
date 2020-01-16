var models =require('../models');

//function read get
module.exports = {
    list: function (req, res) {
        models.User.findAll()
            .then(function (users) {
                res.status(200).json(users);
            })
            .catch(function (err) {

            })
    },
    categories:function(req, res){
        res.send("katagori")
    },

    //function created post
    add:function (req,res) {
        models.User.create({
            email: req.body.email,
            name: req.body.name,
            birthday: req.body.birthday,
            balance:req.body.balance
        })
            .then(function (user){
                res.status(200).json({
                    status: 'ok',
                    data:user
                })
            })
            .catch(function (err) {
                res.status(400).json({
                    status:err.message
                })
            })
    },

    update:function (req, res) {
        models.User.update({
            email: req.body.email,
            name: req.body.name,
            birthday: req.body.birthday,
            balance:req.body.balance
        },{
            where: {
                id: req.params.id
            }
        })
            .then(function (user) {
                res.status(200).json({
                    status:"ok",
                    data:user
                })
            })
            .catch(function (err) {
                res.status(400).json({
                    status:err.message
                })

            })
    },

    delete: function (req, res) {
        models.User.destroy({
            where:{
                id:req.params.id
            }
        })
            .then(function (user) {
                res.status(200).json({
                    status:'ok',
                    data:user
                })
            })

    }
}
