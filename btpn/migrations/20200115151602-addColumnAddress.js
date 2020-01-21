'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'address',
      Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
  }
};
