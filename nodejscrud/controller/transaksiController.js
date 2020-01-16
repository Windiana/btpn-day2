var models =require('../models');

//function read get
module.exports = {
    list: function (req, res) {
        models.Transaksi.findAll()
            .then(function (transaksi) {
                res.status(200).json(transaksi);
            })
            .catch(function (err) {

            })
    },
    categories:function(req, res){
        res.send("katagori")
    },

    //function created post
    add:function (req,res) {
        models.Transaksi.create({
            date:  req.body.date,
            deskripsi:  req.body.deskripsi,
            notes:  req.body.notes,
            balance:  req.body.balance,
        })
            .then(function (transaksi){
                res.status(200).json({
                    status: 'ok',
                    data:transaksi
                })
            })
            .catch(function (err) {

            })
    },

    update:function (req, res) {
        models.Transaksi.update({
            date:  req.body.date,
            deskripsi:  req.body.deskripsi,
            notes:  req.body.notes,
            balance:  req.body.balance,
        },{
            where: {
                id: req.params.id
            }
        })
            .then(function (transaksi) {
                res.status(200).json({
                    status:"ok",
                    data:transaksi
                })
            })
            .catch(function (err) {

            })
    },

    delete: function (req, res) {
        models.Transaksi.destroy({
            where:{
                id:req.params.id
            }
        })
            .then(function (transaksi) {
                res.status(200).json({
                    status:'ok',
                    data:transaksi
                })
            })

    }
}
