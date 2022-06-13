'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Faculties', [
      {
        name: 'BCA',
        description: 'Bachelors in Computer Application',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BBA',
        description: 'Bachelors in Business Administration',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BBS',
        description: 'Bachelors in Business Studies',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
