'use strict';

module.exports = {
  up: function(queryInterface, Sequelize){
    return queryInterface.addColumn(
      'transactions',
      'amount',
      Sequelize.FLOAT
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
