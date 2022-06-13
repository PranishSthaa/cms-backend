'use strict';
const md5 = require('md5');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{w
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        username: 'superAdmin',
        email: 'super@admin.com',
        password: md5('secret'),
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'testAdmin',
        email: 'test@admin.com',
        password: md5('secret'),
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'testAccountant',
        email: 'test@accountant.com',
        password: md5('secret'),
        RoleId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
