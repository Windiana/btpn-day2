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
    // associations can be defined here
  };
  return User;
};