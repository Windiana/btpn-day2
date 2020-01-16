'use strict';
module.exports = (sequelize, DataTypes) => {
  const brands = sequelize.define('brands', {
    brandscode: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  brands.associate = function(models) {
    // associations can be defined here
  };
  return brands;
};
