//TASK 9
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize){
    return queryInterface.addColumn(
      'users',
      'address',
      Sequelize.STRING
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
