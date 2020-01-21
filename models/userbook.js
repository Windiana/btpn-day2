'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserBook = sequelize.define('UserBook', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  UserBook.associate = function(models) {
    // associations can be defined here
  };
  return UserBook;
};