'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email:{
      allowNull:false,
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args: true,
          msg: "format email salah"
        },
        isUniqueEmail: (value, next) => {
          User.findOne({
            where:{email: value},
            attributes:['email']
          })
            .done(function (err) {
              if (err)
                return next("Email anda sudah digunakan")
              next();
            })
        }
      }
    },
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    balance:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric:{
          args:true,
          msg:"data balance harus diisi data numberik"
        }
      }
    },
    password: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Transactions, {as: "transactions"})
    User.belongsToMany(models.Kelas,{
      through:models.UserKelas,
      foreignKey:"userId"
    })
  };
  return User;
};