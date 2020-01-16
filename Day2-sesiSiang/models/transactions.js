'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    amount:{
      allowNull:false,
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:{
          args: true,
          msg: "data amount harus diisi numberik"
        },
        isAmountLessThanBalance(amount){
          if(parseInt(amount) >= parseInt(this.balance)){
            throw new Error("jumlah amount harus lebih kecil dari balance")
          }
        }
      }
    },
    notes:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isIn:{
          args: [['DB','CR']],
          msg: "data notes harus diisi dengan DB/CR"
        },
        isUppercase:true
      }
    },
    balance:{
      allowNull:false,
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:{
          args: true,
          msg:"data balance harus diisi numberik "
        }
      }
    }
  }, {});
  Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Transactions;
};