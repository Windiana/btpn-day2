'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserKelas = sequelize.define('UserKelas', {
    userId: DataTypes.INTEGER,
    kelasId: DataTypes.INTEGER
  }, {});
  UserKelas.associate = function(models) {
    // associations can be defined here
  };
  return UserKelas;
};