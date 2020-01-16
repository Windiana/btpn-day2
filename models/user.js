'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          args : true,
          msg : "Wrongs email"
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
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};