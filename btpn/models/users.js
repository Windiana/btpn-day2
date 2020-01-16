'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    balance: DataTypes.FLOAT
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};