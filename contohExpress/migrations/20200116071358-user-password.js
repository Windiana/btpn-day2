'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'password',
      Sequelize.STRING
    );
  },
  down: (queryInterface, Sequelize) => {

  }
};
