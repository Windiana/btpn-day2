'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    notes: {
      type: DataTypes.TEXT,
      validate: {
        isIn: {
          args: [['DB', 'CR']],
          msg: "Note Harus Diisi Dengan DB / CR"
        }
      }
    },
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: {
          args: true,
          msg: "Format Balance Harus Angka"
        }
      }
    },
    amount:{
      type: DataTypes.FLOAT,
      validate:{
        isNumeric: {
          args: true,
          msg: "Format Amount Harus Angka"
        },
        isLessThanOtherField(amount) {
          if (parseFloat(amount) >= parseFloat(this.balance)) {
            throw new Error('Amount Harus Lebih Kecil dari Balance');
          }
        }
      }
    }
  }, {});

  Transactions.beforeValidate((transactions, option) =>{
    transactions.notes = transactions.notes.toUpperCase()
    return transactions
  });

  Transactions.associate = function(models) {
    Transactions.belongsTo(models.User, {  as: "users" });
  };
  return Transactions;
};