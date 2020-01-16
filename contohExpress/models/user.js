'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
    address: DataTypes.STRING,
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true
      }
    },
    password: {
      type: DataTypes.STRING
      },
  },

  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};