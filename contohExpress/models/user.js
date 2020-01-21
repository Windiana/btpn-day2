'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Harus berformat Email (nama@domain.com)"
          },
          isUnique: function (value, next) {
            User.findOne({
              where: {email: value},
              attributes: ['email']
            })
              .done(function (err) {
                if (err)
                  return next('Email Sudah Digunakan');
                next();
              });

          }
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

  User.associate = function (models) {
    User.hasMany(models.Transactions, {as: "transactions"});
  };
  return User;
};