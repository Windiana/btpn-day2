'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*return queryInterface.renameColumn('users', 'address', 'Address');*/
    return queryInterface.addColumn(
      'users',
      'address',
      Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
    /*return queryInterface.removeColumn(
      'users',
      'address'
    );*/
  }
};
