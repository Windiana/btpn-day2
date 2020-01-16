var models =require('../models');

//function read get
module.exports = {
    list: function (req, res) {
        models.brands.findAll()
            .then(function (brands) {
                res.status(200).json(brands);
            })
            .catch(function (err) {

            })
    },
    categories:function(req, res){
        res.send("katagori")
    },

    //function created post
    add : function (req,res) {
        models.brands.create({
            brandscode: req.body.brandscode,
            name: req.body.name,
            address:req.body.address,
            city: req.body.city
        })
            .then(function (brand){
                res.status(200).json({
                    status: 'ok',
                    data:brand
                })
            })
            .catch(function (err) {

            })
    },

    update:function (req, res) {
        models.brands.update({
            brandscode: req.body.brandscode,
            name: req.body.name,
            address:req.body.address,
            city: req.body.city,
        },{
            where: {
                id: req.params.id
            }
        })
            .then(function (brands) {
                res.status(200).json({
                    status:"ok",
                    data:brands
                })
            })
            .catch(function (err) {

            })
    },

    delete: function (req, res) {
        models.brands.destroy({
            where:{
                id:req.params.id
            }
        })
            .then(function (brands) {
                res.status(200).json({
                    status:'ok',
                    data:brands
                })
            })

    }
}
