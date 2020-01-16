'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    date: DataTypes.DATE,
    deskripsi: DataTypes.TEXT,
    notes: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {});
  Transaksi.associate = function(models) {
    // associations can be defined here
  };
  return Transaksi;
};