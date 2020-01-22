var models = require('../models');

module.exports = {
    all : function (req , res) {
        models.Book.findAll()
            .then(function(book){
                res.status(200).json(book);
            })
            .catch(function(err){
                res.status(400).json(err)
            })
    },
    add : function (req , res) {
        models.Book.create({
            title : req.body.title,
            page : req.body.page,
            price : req.body.price
        }).then(function(book){
            res.status(201).json({
                status: 'created',
                data : book
            });
        }).catch(function(err){
            res.status(200).json({
                status: err
            })
        })
    },
    // update : function (req , res) {
    //     models.Book.update()
    //         .then(function(book){
    //             res.status(201).json(book);
    //         })
    //         .catch(function(err){
    //             res.status(400).json(err)
    //         })
    // },
    // delete : function (req , res) {
    //     models.Book.destroy()
    //         .then(function(book){
    //             res.status(200).json(book);
    //         })
    //         .catch(function(err){
    //             res.status(400).json(err)
    //         })
    // },

};