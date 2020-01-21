'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email:{
      type : DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "format email harus benar"
        },
        isUnique: function (value, next) {
          Users.findOne({
            where: {email: value},
            attributes: ['email']
          })
            .done(function (err) {
              if (err)
                return next("email already exist")
              next();
            })
        }
      }
    },
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    balance: {
      type : DataTypes.FLOAT,
       validate:{
         isNumeric: {
           args:true,
           msg: "balance hanya boleh numeric"
         }
       }
    },
    password: DataTypes.STRING
  });
  Users.associate = function(models) {
   Users.hasMany(models.Transactions,{as:"transactions"})
  };
  return Users;
};