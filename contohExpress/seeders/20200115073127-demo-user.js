'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demo.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'John',
      lastName: 'Cena',
      email: 'cena@demo.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'John',
      lastName: 'Titor',
      email: 'titor@demo.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'John',
      lastName: 'Berg',
      email: 'berg@demo.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
