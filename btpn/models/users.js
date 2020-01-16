'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email:{
      type : DataTypes.STRING,
      validate:{
        isEmail:true
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
    address: DataTypes.STRING,
    password: DataTypes.STRING
  });
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};