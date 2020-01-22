'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    description: DataTypes.TEXT,
    notes: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn: {
          args: [['cr', 'db']],
          msg: "salah harus cr / db"
        }
      }
    },
    balance: {
      type :  DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isInt : {
          msg : "harus angka"
        }
      }
    },
    amount : {
      type :  DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isInt : {
          msg : "harus angka"
        },
      }
    }
  });
  Transaction.associate = function(models) {
    // associations can be defined here
  };


  // Hook
  Transaction.beforeValidate((transactions) => {
    transactions.notes = transactions.notes.toUpperCase();
    return transactions
  });

return Transaction;
};