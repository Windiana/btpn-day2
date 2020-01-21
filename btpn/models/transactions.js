'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    notes: {
      type : DataTypes.TEXT,
      validate:{
        isIn: [['DB', 'CR']]
      }
    },
    balance:  {
      type : DataTypes.FLOAT,
      validate:{
        isNumeric: {
          args:true,
          msg: "balance hanya boleh numeric"
        }
      }
    },
    amount: {
      type : DataTypes.FLOAT,
      validate:{
        isNumeric: {
            args:true,
            msg: "data harus numeric"
        },
        isGreaterThanOtherField(value) {
          if (parseInt(value) >= parseInt(this.balance)) {
            throw new Error('amount harus lebih kecil dari balance');
          }
        }
      }
    }
  });

  Transactions.beforeValidate((transactions)=>{
    transactions.notes = transactions.notes.toUpperCase()
    return transactions
  })
  Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Transactions;
};