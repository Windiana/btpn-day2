'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        unique : true,
        isEmail : {
          args : true,
          msg : "Wrongs email"
        },
        isUnique : (value , next) => {
            User.findOne({
              where : {
                email : value
              }
            }).then(function(result){
              if(result === null){
                return next()
              }else {
                return next(' Email already use')
              }
            }).catch(err =>{
              return next(err)
            })
        }
      }
    },
    birthDay: DataTypes.DATE,
    balance: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isInt: {
          msg: "Balance Must be an integer"
        },
      }
    },
    password : DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.belongsToMany(models.Book, {
      through: models.UserBook,
      foreignKey: "userId",
    });
  };
  return User;
};