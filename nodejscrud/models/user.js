'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password:{
      type:DataTypes.FLOAT
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail : {
          args: true,
          msg: "format harus email"
        }
      }
    },
    name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    balance:{
      type : DataTypes.INTEGER,
      validate:{
        isNumeric :{
          args:true,
          msg: "harus di isi angka"
        }
      }
    }
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
