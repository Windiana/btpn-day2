'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kelas = sequelize.define('Kelas', {
    name: DataTypes.STRING,
    jam: DataTypes.STRING
  }, {});
  Kelas.associate = function(models) {
    Kelas.belongsToMany(models.User,{
      through: models.UserKelas,
      foreignKey: "kelasId"
    })
  };
  return Kelas;
};