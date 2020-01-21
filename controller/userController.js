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
      res.json({error: err})
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
          res.status(201).json({
            email,
            name,
            birthdate,
          })
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
        email: email
      }
    })
      .then(function(user){
        if(user){
          // dapetin dari plain password yang di hash
          // dapetin dari database, password yang sudah di hash sebelumnya
          bcrypt.compare(password, user.password,function (err, result) {
            if(result){
              // geterate token by JWT
              var token = jwt.sign({
                id:user.id,
                email: user.email
              },process.env.SECRET_TOKEN)
              res.status(200).json({
                token: token
              })
            }
          })
        }
      })
  },
  getUserTransaction: async (req,res, next) =>{
    try{
      const userTrans = await models.User.findByPk(req.params.userId,{
        include: [
          {
            model: models.Transactions,
            attributes: ["description", "amount"],
            required: true,
            as: "transactions",
          }
        ]
      })
      res.json(userTrans);
    }catch (err) {
      next(err)
    }
  },
  addUserKelas : async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.params.userId);
      if (!user) {
        throw new Error("User not found");
      }

      const kelas = await models.Kelas.findByPk(req.body.kelasId);
      if (!kelas) {
        throw new Error("Kelas not found");
      }

      const userKelas = await models.UserKelas.create({
        kelasId: req.body.kelasId,
        userId: user.id,
      });
      return res.json(userKelas);
    } catch (err) {
      next(err);
    }
  },
  getUserKelas : async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.params.userId, {
        include: [
          {
            model: models.Kelas,
            attributes: ["name", "jam"],
            through: { attributes: [] },
          },
        ],
      });

      return res.json(user);
    } catch (errr) {
      next(errr);
    }
  }

}