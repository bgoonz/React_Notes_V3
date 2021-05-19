'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'firstName', { type: Sequelize.STRING(25) })
    await queryInterface.addColumn('Users', 'lastName', { type: Sequelize.STRING(25) })
    await queryInterface.addColumn('Users', 'streetAddress', { type: Sequelize.STRING(100) })
    await queryInterface.addColumn('Users', 'city', { type: Sequelize.STRING(100) })
    await queryInterface.addColumn('Users', 'stateProvince', { type: Sequelize.STRING(25) })
    await queryInterface.addColumn('Users', 'country', { type: Sequelize.STRING(50) })
    await queryInterface.addColumn('Users', 'postalCode', { type: Sequelize.INTEGER })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'firstName', { type: Sequelize.STRING(25) })
    await queryInterface.removeColumn('Users', 'lastName', { type: Sequelize.STRING(25) })
    await queryInterface.removeColumn('Users', 'streetAddress', { type: Sequelize.STRING(100) })
    await queryInterface.removeColumn('Users', 'city', { type: Sequelize.STRING(100) })
    await queryInterface.removeColumn('Users', 'stateProvince', { type: Sequelize.STRING(25) })
    await queryInterface.removeColumn('Users', 'country', { type: Sequelize.STRING(50) })
    await queryInterface.removeColumn('Users', 'postalCode', { type: Sequelize.INTEGER })
  }
};
