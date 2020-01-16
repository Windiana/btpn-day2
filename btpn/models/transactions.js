'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    balance: DataTypes.FLOAT
  }, {});
  Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Transactions;
};