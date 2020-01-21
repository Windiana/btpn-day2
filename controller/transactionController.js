var models = require('../models');

module.exports = {
    all : function (req , res) {
        models.Transaction.findAll()
            .then(function(transaction){
                res.status(200).json(transaction);
            })
            .catch(function(err){

            })
    },

    add : function (req ,res ){
        models.Transaction.create({
            description : req.body.description,
            notes: req.body.notes,
            balance : req.body.balance,
            amount : req.body.amount
        }).then(function(transaction){
            res.status(201).json({
                status: 'created',
                data : transaction
            });
        }).catch(function(err){
            res.status(400).json({
                status: err
            })
        })
    },
    //CREATE
    update : function (req , res){
        models.User.update({
            description : req.body.description,
            notes: req.body.notes,
            balance : req.body.balance,
            amount : req.body.amount
        },{
            where: {
                id : req.params.id
            }
        }).then(function(transaction){
            res.status(201).json({
                status: 'updated',
                data : transaction
            });
        }).catch(function(err){

        })
    },
    delete : function(req ,res){
        models.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(transaction){
            res.status(201).json({
                status: 'deleted',
                data : transaction
            });
        }).catch(function(err){

        })
    }
};