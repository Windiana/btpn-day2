'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkInsert('Users', [{
      email: 'abddul29karim@gmail.com',
      lastName: 'Doe',
      name: 'karim',
      birthday: '1994-10-29',
      balance: 2000000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }
};
