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
    return queryInterface.bulkInsert('Departments', [
      {
        name: 'Science',
        description: 'Department of Science',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Management',
        description: 'Department of Management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Humanities',
        description: 'Department of Humanities',
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
