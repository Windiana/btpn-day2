'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    page: DataTypes.INTEGER
  }, {});

  Book.associate = function(models) {
    Book.belongsToMany(models.User, {
      through: models.UserBook,
      foreignKey: "bookId",
    });
  };
  return Book;
};