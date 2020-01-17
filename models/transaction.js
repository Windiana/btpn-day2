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
          msg: "wrong notes input (ex : cr / db)"
        }
      }
    },
    balance: {
      type :  DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isInt : {
          msg : "Balance must be a number"
        }
      }
    },
    amount : {
      type :  DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isInt : {
          msg : "Balance must be a number"
        },
      }
    }
  });
  Transaction.associate = function(models) {
    // associations can be defined here
  };

  // Transaction.beforeCreate(function(Transaction, options){
  //   var tr = Transaction.note;
  //   tr.toUpperCase();
  //   return tr;
  //   var upperCase = (note) => {
  //     var note2 = note.toUpperCase();
  //     return note2
  //   };
  //   return upperCase(transaction.notes).then(function(tr) {
  //     transaction.notes = tr
  //   })
  // });

  // Hooks
  Transaction.beforeValidate((transactions) => {
    transactions.notes = transactions.notes.toUpperCase();
    return transactions
  });

return Transaction;
};