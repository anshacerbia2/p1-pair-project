'use strict';
const fs = require('fs');

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
    data.forEach(v => {
      delete v.id;
      v.createdAt = v.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Users', data, {});
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
