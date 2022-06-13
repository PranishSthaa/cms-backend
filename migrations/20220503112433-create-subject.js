'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      credit_hour: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      full_marks_theory: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      pass_marks_theory: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      full_marks_practical: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      pass_marks_practical: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subjects');
  }
};